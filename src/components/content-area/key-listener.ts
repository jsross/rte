export default interface KeyListener {
    /**
     * 
     * @param key 
     * @param selection 
     * @returns boolean true value indicates key processing should continue
     */
    handleKey(key:string, selection:Selection): boolean;
}