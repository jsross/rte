export default class StringHelper {
    static insert(target: string, value:string, index: number) {
        var output = target.substring(0, index) + value + target.substring(index);
  
        return output;
    }

    static remove(target:string, index:number, count:number) {
        let end = index + count;
        var output = target.substring(0, index) + target.substring(end);
  
        return output;
    }
}