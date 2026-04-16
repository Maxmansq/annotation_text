export interface TextInterface {
  id: number,
  title: string,
  content: string,
}

export interface CreateTextDto {
  id: number | null,
  title: string,
  content: string
}
