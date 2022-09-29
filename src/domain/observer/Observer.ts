export default interface Observer {
    toReact(input: Record<string, unknown>): void;
}
