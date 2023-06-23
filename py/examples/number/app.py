# pyright: reportUnusedFunction=false

from shiny import App, Inputs, Outputs, Session, render, ui

from componenttemplate import example_number_input, input_html, input_text

app_ui = ui.page_fluid(
    ui.h5("Number Input"),
    example_number_input("num", value=10, min=5, max=15),
    ui.output_text_verbatim("num_val"),
    input_text("name", label="Your name"),
    ui.output_text_verbatim("name"),
    input_html("age", label="Your age", type="number", value=35, min=0, max=150),
    ui.output_text_verbatim("age")
)


def server(input: Inputs, output: Outputs, session: Session):
    @output
    @render.text
    def num_val():
        return f"Number input: {input.num()}"

    @output
    @render.text
    def name():
        return f"Name: {input.name()}"

    @output
    @render.text
    def age():
        return f"Age: {input.age()}"


app = App(app_ui, server, debug=True)
