import { IAction } from "./IAction";
import { Socket } from "socket.io";

export class ActionManager {
    private actions: IAction[] = [];

    public addAction(action: IAction): void {
        this.actions.push(action);
    }

    public registerActions(socket: Socket): void {
        for (const action of this.actions) {
            action.register(socket);
        }
    }
}
