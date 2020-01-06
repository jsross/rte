export default class StringHelper {
    static insert(target: string, value:string, index: number) {
        var output = target.substring(0, index) + value + target.substring(index);
  
        return output;
    }

    static remove(target:string, index:number, count:number = null) {
        var result:string = target.substring(0, index);

        if(count != null){
            var endIndex = index + count;

            result += target.substring(endIndex);
        }
  
        return result;
    }
}