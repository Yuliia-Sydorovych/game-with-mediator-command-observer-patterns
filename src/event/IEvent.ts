export interface Event
{
    type: string;
    execute(): void;
}