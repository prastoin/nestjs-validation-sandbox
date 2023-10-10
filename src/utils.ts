export function fromArrayToRecord(array: string[]): Record<string, string> {
    return array.reduce((acc, el) => ({ ...acc, [el]: el }), {})
}