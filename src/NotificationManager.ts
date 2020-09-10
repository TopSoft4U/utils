import {EventEmitter} from "events";

class NotificationManager extends EventEmitter {
  listNotify: NotificationType[] = [];
  id = 0;

  // region Event handling
  private emitChange() {
    this.emit("change", this.listNotify);
  }

  addChangeListener(callback: NotificationOnClick) {
    this.addListener("change", callback);
  }

  removeChangeListener(callback: NotificationOnClick) {
    this.removeListener("change", callback);
  }

  // endregion

  // region Add & remove
  private create(obj: NotificationType) {
    const notification: NotificationType = {...obj, id: this.id++, timeout: obj.timeout || 8000};

    if (notification.priority)
      this.listNotify.unshift(notification);
    else
      this.listNotify.push(notification);

    this.emitChange();
  }

  remove(id: number) {
    this.listNotify = this.listNotify.filter(notification => id !== notification.id);
    this.emitChange();
  }

  // endregion

  // region Types
  info(obj: NotificationObjectType) {
    this.create({...obj, id: 0, type: "info"});
  }

  success(obj: NotificationObjectType) {
    this.create({...obj, id: 0, type: "success"});
  }

  warning(obj: NotificationObjectType) {
    this.create({...obj, id: 0, type: "warning"});
  }

  error(obj: NotificationObjectType) {
    this.create({...obj, id: 0, type: "danger"});
  }

  // endregion
}

export default new NotificationManager();

type NotificationObjectType = {
  message: string;
  title?: string;
  timeout?: number;
  onClick?: NotificationOnClick;
  onClickText?: string;
  priority?: boolean;
};

export type NotificationType = NotificationObjectType & {
  id: number;
  type: NotificationTypeType;
}

type NotificationTypeType = "success" | "warning" | "info" | "danger";
type NotificationOnClick = (...args: unknown[]) => void;
