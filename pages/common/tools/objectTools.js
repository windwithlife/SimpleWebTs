




  

    function isClass(o){
        if(o===null) return "Null";
        if(o===undefined) return "Undefined";
        return Object.prototype.toString.call(o).slice(8,-1);
    }
    
    function deepMerge (target,obj){
        let oClass= isClass(obj);
            //确定result的类型
        if (!target){
            if(oClass==="Object"){
                target={};
            }else if(oClass==="Array"){
                target=[];
            }else{
                return obj;
            }
        }
        
        for(let key in obj){
            var copy=obj[key];
            if(isClass(copy)=="Object"){
                target[key]=deepMerge(target[key],copy);//递归调用
            }else if(isClass(copy)=="Array"){
                target[key]=deepMerge(target[key],copy);
            }else{
                target[key]=obj[key];
            }
        }
        return target;
    }


module.exports = {
    deepMerge:deepMerge
} ;
