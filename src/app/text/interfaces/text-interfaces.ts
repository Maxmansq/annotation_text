export interface TextInterface {
  id: number;
  title: string;
  content: ControlText;
}

export interface CreateTextDto {
  id: number | null,
  title: string,
  content: ControlText
}

export interface EditText {
  text: string,
  color: string
}

export interface ControlText {
  text: string,
  template: string
}
