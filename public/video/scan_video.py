import json
import subprocess
from pathlib import Path

VIDEO_EXTENSIONS = {".mp4"}

def run_ffprobe(file_path: Path):
    cmd = [
        "ffprobe",
        "-v", "quiet",
        "-print_format", "json",
        "-show_format",
        "-show_streams",
        str(file_path)
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    return json.loads(result.stdout)

def safe_float(value, default=0.0):
    try:
        return float(value)
    except (TypeError, ValueError):
        return default

def human_size(num_bytes):
    num_bytes = float(num_bytes)
    units = ["B", "KB", "MB", "GB", "TB"]
    for unit in units:
        if num_bytes < 1024 or unit == units[-1]:
            return f"{num_bytes:.2f} {unit}"
        num_bytes /= 1024

def parse_fps(rate):
    if not rate or rate == "0/0":
        return ""
    if "/" in rate:
        a, b = rate.split("/")
        try:
            a = float(a)
            b = float(b)
            if b != 0:
                return f"{a / b:.2f}"
        except ValueError:
            return rate
    return rate

def probe_video(file_path: Path):
    data = run_ffprobe(file_path)

    fmt = data.get("format", {})
    streams = data.get("streams", [])

    video_stream = next((s for s in streams if s.get("codec_type") == "video"), {})
    audio_stream = next((s for s in streams if s.get("codec_type") == "audio"), {})

    size_bytes = safe_float(fmt.get("size"))
    duration = safe_float(fmt.get("duration"))
    total_bitrate = safe_float(fmt.get("bit_rate"))
    video_bitrate = safe_float(video_stream.get("bit_rate"))

    return {
        "file": str(file_path),
        "size": human_size(size_bytes),
        "size_bytes": int(size_bytes) if size_bytes else 0,
        "format": fmt.get("format_name", ""),
        "duration_sec": round(duration, 2),
        "video_codec": video_stream.get("codec_name", ""),
        "audio_codec": audio_stream.get("codec_name", ""),
        "width": video_stream.get("width", ""),
        "height": video_stream.get("height", ""),
        "fps": parse_fps(video_stream.get("r_frame_rate")),
        "pixel_format": video_stream.get("pix_fmt", ""),
        "video_bitrate_kbps": round(video_bitrate / 1000, 2) if video_bitrate else "",
        "total_bitrate_kbps": round(total_bitrate / 1000, 2) if total_bitrate else "",
    }

def scan_videos(root_folder="."):
    root = Path(root_folder)
    files = [p for p in root.rglob("*") if p.is_file() and p.suffix.lower() in VIDEO_EXTENSIONS]

    if not files:
        print("No MP4 files found.")
        return

    results = []
    for file_path in files:
        try:
            results.append(probe_video(file_path))
        except subprocess.CalledProcessError as e:
            results.append({
                "file": str(file_path),
                "size": "ERROR",
                "size_bytes": 0,
                "format": "",
                "duration_sec": "",
                "video_codec": f"ffprobe failed: {e}",
                "audio_codec": "",
                "width": "",
                "height": "",
                "fps": "",
                "pixel_format": "",
                "video_bitrate_kbps": "",
                "total_bitrate_kbps": "",
            })

    results.sort(key=lambda x: x["size_bytes"], reverse=True)

    headers = [
        "file", "size", "format", "duration_sec", "video_codec", "audio_codec",
        "width", "height", "fps", "pixel_format", "video_bitrate_kbps", "total_bitrate_kbps"
    ]

    row_format = "{:<50} {:>10} {:<15} {:>10} {:<12} {:<12} {:>6} {:>6} {:>8} {:<12} {:>18} {:>18}"
    print(row_format.format(*headers))
    print("-" * 190)

    for r in results:
        print(row_format.format(
            r["file"][:50],
            r["size"],
            str(r["format"])[:15],
            str(r["duration_sec"]),
            str(r["video_codec"])[:12],
            str(r["audio_codec"])[:12],
            str(r["width"]),
            str(r["height"]),
            str(r["fps"]),
            str(r["pixel_format"])[:12],
            str(r["video_bitrate_kbps"]),
            str(r["total_bitrate_kbps"]),
        ))

if __name__ == "__main__":
    scan_videos(".")   # change "." to your assets/videos folder if needed