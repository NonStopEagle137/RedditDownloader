import {Entity, Column, PrimaryColumn} from 'typeorm';
import {DBEntity} from "./db-entity";


@Entity({ name: 'settings' })
export default class DBSetting extends DBEntity {
    @PrimaryColumn({length: 20})
    id!: string;

    @Column({ type: "text" })
    valueJSON!: string;

    get value () {
        return JSON.parse(this.valueJSON)
    }

    set value (val: any) {
        this.valueJSON = JSON.stringify(val)
    }

    /**
     * Retrieve the value of the given Setting key. Returns the default if none is saved.
     */
    static async get<S extends typeof defaultSettings, K extends keyof S>(key: K): Promise<S[K]> {
        const s = await DBSetting.findOne({ id: key as string });

        // @ts-ignore
        const def: any = defaultSettings[key];
        return s ? s.value : def;
    }

    /**
     * Set the value of the given Setting key. Automatically saves.
     */
    static async set<S extends typeof defaultSettings, K extends keyof S>(key: K, val: S[K]): Promise<DBSetting> {
        const found = await DBSetting.findOne({ id: key as string });
        const s = found || await DBSetting.build({id: key as string, valueJSON: ''});
        s.value = val;
        return s.save();
    }

    /**
     * Retrieves an object with all current setting keys and values.
     * Useful for sending to any interface that needs to know all current settings.
     */
    static async getAll(): Promise<typeof defaultSettings> {
        const settings = await DBSetting.find();
        const find = (id: string) => settings.find(s => s.id === id);
        const ret: Record<any, any> = {};
        Object.keys(defaultSettings).forEach((key: string) => {
           // @ts-ignore
            ret[key] = find(key)?.value || defaultSettings[key];
        });
        return ret as typeof defaultSettings;
    }
}


const defaultSettings = {
    test: 1337,
    refreshToken: '',
    userAgent: `RMD-${Math.random()}`,

    /** The maximum number of concurrent downloads. */
    concurrentThreads: 10,

    /** The output template RMD uses when generating a file name. */
    outputTemplate: '[subreddit]/[title] ([author])'
}