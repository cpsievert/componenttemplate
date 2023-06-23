from __future__ import annotations

__version__ = "0.0.1"

__all__ = ("example_number_input", "input_html", "input_text")


from pathlib import PurePath
from typing import Literal, Optional

from htmltools import HTMLDependency, Tag, TagAttrs, TagAttrValue, TagChild, TagList


def input_text(id: str, label: TagChild, value: Optional[str] = None, placeholder: Optional[str] = None, **kwargs: TagAttrValue) -> TagList:
    return input_html(id, label, type="text", value=value, placeholder=placeholder, **kwargs)


def input_html(id: str, label: TagChild, type: Literal["text", "number"], value: Optional[str | float | int] = None, placeholder: Optional[str] = None, **kwargs: TagAttrValue) -> TagList:

    return TagList(
        component_dep("bslib-input-html.js"),
        Tag("bslib-input-html", label, type=type, id=id, value=value, placeholder=placeholder, _add_ws=True, **kwargs)
    )


def example_number_input(
    id: str, *args: TagChild | TagAttrs, _add_ws: bool = True, **kwargs: TagAttrValue
) -> TagList:
    """
    Create a <example-number-input> tag.

    A WebComponent for creating number inputs.

    Parameters
    ----------
    *args
        Child elements to this tag.
    _add_ws
        Whether whitespace should be added around this tag.
    **kwargs
        Attributes to this tag.

    Returns
    -------
    :
        Tag

    See Also
    --------
    ~htmltools.Tag
    """

    return TagList(
        component_dep("example-number-input.js"),
        Tag("example-number-input", *args, id=id, _add_ws=_add_ws, **kwargs),
    )

def component_dep(src: str) -> HTMLDependency:
    www_path = PurePath(__file__).parent / "www"

    return HTMLDependency(
        name=f"shinycomponent-{src}",
        version=__version__,
        source={
            "package": "componenttemplate",
            "subdir": str(www_path),
        },
        stylesheet={"href": "open-props.min.css"},
        script=[
            {"src": src, "type": "module"},
        ],
    )
