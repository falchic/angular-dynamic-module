import { Injectable } from "@angular/core";
import { asyncScheduler, BehaviorSubject, finalize, Observable, observeOn } from "rxjs";

type LoadingContext = object;
type LoaderId = string | number;
const DEFAULT_LOADER_ID: LoaderId = '_DEFAULT';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    protected loadingStates = new WeakMap<LoadingContext, Map<LoaderId, boolean>>();
    protected loadingStates$ = new WeakMap<LoadingContext, Map<LoaderId, BehaviorSubject<boolean>>>();

    doLoading<V>(source$: Observable<V>, context: LoadingContext, loaderId?: LoaderId): Observable<V> {
        this.startLoading(context, loaderId);

        return source$.pipe(
            observeOn(asyncScheduler),
            finalize(() => this.endLoading(context, loaderId)),
        );
    }

    isLoading(context: LoadingContext, loaderId?: LoaderId): boolean {
        const loaderStates = this.loadingStates.get(context);

        if (!loaderStates) {
            return false;
        }
        else {
            if (loaderId !== undefined) {
                return loaderStates.get(this.getLoaderId(loaderId)) ?? false;
            }
            else {
                return [...loaderStates.values()].filter(state => state).length > 0;
            }
        }
    }

    startLoading(context: LoadingContext, loaderId?: LoaderId): void {
        this.setLoadingState(context, true, this.getLoaderId(loaderId));
    }

    endLoading(context: LoadingContext, loaderId?: LoaderId): void {
        this.setLoadingState(context, false, this.getLoaderId(loaderId));
    }

    clearLoadings(): void {
        this.loadingStates = new WeakMap<LoadingContext, Map<LoaderId, boolean>>();
        this.loadingStates$ = new WeakMap<LoadingContext, Map<LoaderId, BehaviorSubject<boolean>>>();
    }

    protected setLoadingState(context: LoadingContext, state: boolean, loaderId: LoaderId): void {
        if (!this.hasLoadingStates(context, loaderId)) {
            if (this.hasContextLoadingState(context)) {
                this.loadingStates.get(context)?.set(loaderId, state);
                this.loadingStates$.get(context)?.set(loaderId, new BehaviorSubject<boolean>(state));
            }
            else {
                this.loadingStates.set(context, new Map<LoaderId, boolean>([
                    [loaderId, state]
                ]));
                this.loadingStates$.set(context, new Map<LoaderId, BehaviorSubject<boolean>>([
                    [loaderId, new BehaviorSubject<boolean>(state)]
                ]));
            }
        }
        else {
            // @ts-ignore - loadingStates[context] is surely defined in this branch
            this.loadingStates.get(context).set(loaderId, state);
            this.loadingStates$.get(context)?.get(loaderId)?.next(state);
        }
    }

    protected hasLoadingStates(context: LoadingContext, loaderId: LoaderId) {
        return this.hasContextLoadingState(context) && this.hasLoaderLoadingState(context, loaderId);
    }

    protected hasContextLoadingState(context: LoadingContext) {
        return this.loadingStates.has(context) && this.loadingStates$.has(context);
    }

    protected hasLoaderLoadingState(context: LoadingContext, loaderId: LoaderId) {
        return this.loadingStates.get(context)?.has(loaderId) && this.loadingStates$.get(context)?.has(loaderId);
    }

    protected getLoaderId(loaderId?: LoaderId): LoaderId {
        return loaderId ?? DEFAULT_LOADER_ID;
    }

}