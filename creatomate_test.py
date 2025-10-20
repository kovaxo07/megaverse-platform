"""
creatomate_test.py

Central submission file for the Megaverse project.

Usage:
- Add your submission by calling submit(name, payload) from Python or by editing this file.
- Use `list_submissions()` to see what has been added.

This file intentionally keeps a simple in-memory registry for quick local testing. For
persistent records you can edit this file directly or extend the helpers below to write
to disk or push to an API.
"""

from typing import Any, Dict
import json
import datetime

# In-memory registry of submissions (name -> {timestamp, data})
_SUBMISSIONS: Dict[str, Dict[str, Any]] = {}


def submit(name: str, data: Any) -> None:
    """Register a submission under `name`.

    Args:
        name: unique identifier for the submission (e.g., feature name or filename)
        data: arbitrary JSON-serializable payload (dict, list, string, etc.)
    """
    _SUBMISSIONS[name] = {
        "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
        "data": data,
    }
    print(f"Submission '{name}' registered.")


def get_submission(name: str):
    return _SUBMISSIONS.get(name)


def list_submissions():
    return list(_SUBMISSIONS.keys())


def export(filepath: str) -> None:
    """Export all submissions to a JSON file for persistence or review."""
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(_SUBMISSIONS, f, indent=2, ensure_ascii=False)
    print(f"Exported {_SUBMISSIONS.__len__()} submissions to {filepath}")


if __name__ == "__main__":
    # tiny smoke test
    print("creatomate_test.py — ready to accept submissions via submit(name, data)")
