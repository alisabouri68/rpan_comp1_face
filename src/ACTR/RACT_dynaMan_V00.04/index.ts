import { dynaStore } from "../../RDUX/dynamanContext/dynaStore";
import { setPath, mergePath, bulkSet, reset } from "../../RDUX/dynamanContext/dynaSlice";

export type DynaCallback = (value: any) => void;

function getByPath(obj: any, path: string) {
    if (!path) return obj;
    return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

class DynaManager {
    private subscribers: { id: symbol; path?: string; cb: DynaCallback }[] = [];

    // --- متدهای کمکی ---
    getState() {
        return dynaStore.getState().dyna;
    }

    get(path: string) {
        return getByPath(this.getState(), path);
    }

    set(path: string, value: any) {
        dynaStore.dispatch(setPath({ path, value }));
    }

    merge(path: string, value: any) {
        dynaStore.dispatch(mergePath({ path, value }));
    }

    bulkSet(obj: Record<string, any>) {
        dynaStore.dispatch(bulkSet(obj));
    }

    reset(next?: any) {
        dynaStore.dispatch(reset(next));
    }

    // --- سیستم subscribe ---
    subscribe(cb: DynaCallback, path?: string) {
        const id = Symbol("dyna_sub");
        this.subscribers.push({ id, path, cb });

        // اجرای اولیه برای مقدار فعلی
        try {
            cb(path ? this.get(path) : this.getState());
        } catch (e) {
            console.warn("DynaManager subscriber error:", e);
        }

        // گوش دادن به تغییرات Redux
        let prevValue = path ? this.get(path) : this.getState();

        const unsubscribe = dynaStore.subscribe(() => {
            const newValue = path ? this.get(path) : this.getState();
            if (JSON.stringify(newValue) !== JSON.stringify(prevValue)) {
                prevValue = newValue;
                cb(newValue);
            }
        });

        return () => {
            unsubscribe();
            this.subscribers = this.subscribers.filter((s) => s.id !== id);
        };
    }
}

export const DynaMan = new DynaManager();
