class Vi{
    constructor(){
        //this.index = null;
        this.cases = 0;
        this.name = null;
    }

    update(){
        var viIndex = "vi";
        database.ref(viIndex).set({
            name:this.name,
            cases:this.cases
        });
    }

    //getCases

    static updateVi(){
        database.ref('/').update({
            vi: null
        });
    }
}