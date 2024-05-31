export interface WebElement {
    click(): Promise<void>;
    type(text: string): Promise<void>;
    getText(): Promise<string>;
    element: Chainable<JQuery<HTMLElement>>;
}