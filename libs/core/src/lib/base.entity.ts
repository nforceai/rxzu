import { BaseEvent } from './interfaces/event.interface';
import { ID, log as _log, LOG_LEVEL, UID } from './utils/tool-kit.util';
import { HashMap } from './utils/types';
import { BaseEntityOptions, BaseEntityType } from './interfaces';

type Keys = keyof Omit<IBaseEntity, keyof EventTarget>;

class IBaseEntity extends EventTarget {
  id!: ID;
  locked!: boolean;
  namespace!: string;
  protected readonly type!: BaseEntityType;
  protected readonly logPrefix!: string;

  constructor(type: BaseEntityType, logPrefix: string) {
    super();
    this.type = type;
    this.logPrefix = logPrefix;
  }

  override addEventListener(
    type: Keys,
    callback: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void {
    super.addEventListener(type, callback, options);
  }
}

export class BaseEntity extends IBaseEntity {
  constructor(options: BaseEntityOptions) {
    super(options.type, options.logPrefix ?? '');
    this.id = options.id || UID();
    this.locked = !!options.locked;
    this.namespace = options.namespace ?? 'default';
  }

  get(key: Keys) {
    return this[key];
  }

  set<K extends Keys>(key: K, value: IBaseEntity[K]) {
    const event = new BaseEvent(this);
    this.dispatchEvent(
      new CustomEvent<BaseEvent<BaseEntity>>(key, {
        detail: event,
      })
    );

    (this as IBaseEntity)[key] = value;
  }

  log(message: string, ...args: any): void {
    _log(`${this.logPrefix} ${message}: `, LOG_LEVEL.LOG, ...args);
  }

  // eslint-disable-next-line
  doClone(lookupTable: HashMap<any> = {}, clone: this) {
    /*noop*/
  }

  clone(lookupTable: HashMap<any> = {}) {
    // try and use an existing clone first
    if (lookupTable[this.id]) {
      return lookupTable[this.id];
    }
    const clone = { ...this };
    clone.id = UID();
    // clone.clearListeners();
    lookupTable[this.id] = clone;

    this.doClone(lookupTable, clone);
    return clone;
  }

  destroy() {
    const event = new BaseEvent(this);
    this.dispatchEvent(
      new CustomEvent<BaseEvent<BaseEntity>>('destroyed', {
        detail: event,
      })
    );
  }
}
