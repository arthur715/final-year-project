<template>
  <div id="codeCompiled">
    <div id="blockScript">
      <div v-for="(codeObj, index) in codeArray" :key="index">
        {{index}} {{codeObj.codeObjStr}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodeCompiled',
  data: function(){
    return{
      vmMainBlock: null,
      codeObj: null,
      codeArray: [],
      lineCount: 0,
      indentCount: 0,
      html1: '&nbsp; &nbsp; &nbsp; &nbsp;',
      spaceStr: "\0 \0 \0 \0 ",
      spaceStr2: "\0 \0 ",
    }
  },
  methods:{
    generatingCodeArray: function(blockObj){
      if(blockObj == null){
        return
      }
      if(blockObj.blockID == 0){
        let str = ""
        for(let i = 0; i < this.indentCount+1; i++){
          str += this.spaceStr
        }
        if(this.lineCount >= 10 && this.lineCount < 100){
          str = str.slice(0,-4)
        }
        else if(this.lineCount >= 100){
          str = str.slice(0,-8)
        }
        str += this.spaceStr2
        str += " moveLeft( );"

        let codeObj = {
          codeObjStr: null,
          codeObjUID: null,
        }
        codeObj.codeObjStr = str
        codeObj.codeObjUID = blockObj.uid
        this.codeArray.splice(this.lineCount, 0, codeObj)
        this.lineCount++
      }
      if(blockObj.blockID == 1){
        let str = ""
        for(let i = 0; i < this.indentCount+1; i++){
          str += this.spaceStr
        }
        if(this.lineCount >= 10 && this.lineCount < 100){
          str = str.slice(0,-4)
        }
        else if(this.lineCount >= 100){
          str = str.slice(0,-8)
        }
        str += this.spaceStr2
        str += " moveRight( );"
        let codeObj = {
          codeObjStr: null,
          codeObjUID: null,
        }
        codeObj.codeObjStr = str
        codeObj.codeObjUID = blockObj.uid
        this.codeArray.splice(this.lineCount, 0, codeObj)
        this.lineCount++
      }
      if(blockObj.blockID == 2){
        let str = ""
        for(let i = 0; i < this.indentCount+1; i++){
          str += this.spaceStr
        }
        if(this.lineCount >= 10 && this.lineCount < 100){
          str = str.slice(0,-4)
        }
        else if(this.lineCount >= 100){
          str = str.slice(0,-8)
        }
        str += this.spaceStr2
        str += " moveUp( );"
        let codeObj = {
          codeObjStr: null,
          codeObjUID: null,
        }
        codeObj.codeObjStr = str
        codeObj.codeObjUID = blockObj.uid
        this.codeArray.splice(this.lineCount, 0, codeObj)
        this.lineCount++
      }
      if(blockObj.blockID == 3){
        let str = ""
        for(let i = 0; i < this.indentCount+1; i++){
          str += this.spaceStr
        }
        if(this.lineCount >= 10 && this.lineCount < 100){
          str = str.slice(0,-4)
        }
        else if(this.lineCount >= 100){
          str = str.slice(0,-8)
        }
        str += this.spaceStr2
        str += " moveDown( );"
        let codeObj = {
          codeObjStr: null,
          codeObjUID: null,
        }
        codeObj.codeObjStr = str
        codeObj.codeObjUID = blockObj.uid
        this.codeArray.splice(this.lineCount, 0, codeObj)
        this.lineCount++
      }
      if(blockObj.blockID == 4){
        if(blockObj.blockName == "Main"){
          let codeObj = {
            codeObjStr: null,
            codeObjUID: null,
          }
          codeObj.codeObjStr = this.spaceStr + this.spaceStr2 + " function Main( ) {"
          codeObj.codeObjUID = blockObj.uid
          this.codeArray.splice(this.lineCount, 0, codeObj)
          //this.codeArray.push(this.spaceStr + this.spaceStr2 + " function Main( ) {")
          this.lineCount++
          this.indentCount++
        }
        
        for(let i in blockObj.children){
          this.generatingCodeArray(blockObj.children[i][0])
        }
        
        if(blockObj.blockName == "Main"){
          this.indentCount--
          let str = this.spaceStr
          if(this.lineCount >= 10 && this.lineCount < 100){
            str = str.slice(0,-4)
          }
          else if(this.lineCount >= 100){
            str = str.slice(0,-8)
          }
          str += this.spaceStr2
          str += "}"
          let codeObj = {
            codeObjStr: null,
            codeObjUID: null,
          }
          codeObj.codeObjStr = str
          codeObj.codeObjUID = blockObj.uid
          this.codeArray.splice(this.lineCount, 0, codeObj)
        }
        
      }
      if(blockObj.blockID == 5){
        let str = ""
        for(let i = 0; i < this.indentCount+1; i++){
          str += this.spaceStr
        }
        if(this.lineCount >= 10 && this.lineCount < 100){
          str = str.slice(0,-4)
        }
        else if(this.lineCount >= 100){
          str = str.slice(0,-8)
        }
        str += this.spaceStr2
        str += " for ( let i = 0; i < " 
        str += blockObj.loopTimes 
        str += "; i++ ) {"
        let codeObj = {
          codeObjStr: null,
          codeObjUID: null,
        }
        codeObj.codeObjStr = str
        codeObj.codeObjUID = blockObj.uid
        this.codeArray.splice(this.lineCount, 0, codeObj)

        this.lineCount++
        this.indentCount++
        
        for(let i in blockObj.children){
          this.generatingCodeArray(blockObj.children[i][0])
        }
        this.indentCount--
        
        
        str = ""
        for(let i = 0; i < this.indentCount+1; i++){
          str += this.spaceStr
        }
        if(this.lineCount >= 10 && this.lineCount < 100){
          str = str.slice(0,-4)
        }
        else if(this.lineCount >= 100){
          str = str.slice(0,-8)
        }
        str += this.spaceStr2
        str += "}"
        let codeObj1 = {
          codeObjStr: null,
          codeObjUID: null,
        }
        codeObj1.codeObjStr = str
        codeObj1.codeObjUID = blockObj.uid
        this.codeArray.splice(this.lineCount, 0, codeObj1)
        this.lineCount++
      }
      if(blockObj.blockID == 6){
        let str = ""
        for(let i = 0; i < this.indentCount+1; i++){
          str += this.spaceStr
        }
        if(this.lineCount >= 10 && this.lineCount < 100){
          str = str.slice(0,-4)
        }
        else if(this.lineCount >= 100){
          str = str.slice(0,-8)
        }
        str += this.spaceStr2
        str += " putStar( );"
        let codeObj = {
          codeObjStr: null,
          codeObjUID: null,
        }
        codeObj.codeObjStr = str
        codeObj.codeObjUID = blockObj.uid
        this.codeArray.splice(this.lineCount, 0, codeObj)
        this.lineCount++
      }
      if(blockObj.blockID == 7){
        let str = ""
        for(let i = 0; i < this.indentCount+1; i++){
          str += this.spaceStr
        }
        if(this.lineCount >= 10 && this.lineCount < 100){
          str = str.slice(0,-4)
        }
        else if(this.lineCount >= 100){
          str = str.slice(0,-8)
        }
        str += this.spaceStr2
        str += " putCross( );"
        let codeObj = {
          codeObjStr: null,
          codeObjUID: null,
        }
        codeObj.codeObjStr = str
        codeObj.codeObjUID = blockObj.uid
        this.codeArray.splice(this.lineCount, 0, codeObj)
        this.lineCount++
      }
      if(blockObj.blockID == 9){
        let str = ""
        for(let i = 0; i < this.indentCount+1; i++){
          str += this.spaceStr
        }
        if(this.lineCount >= 10 && this.lineCount < 100){
          str = str.slice(0,-4)
        }
        else if(this.lineCount >= 100){
          str = str.slice(0,-8)
        }

        str += this.spaceStr2
        str += "if ( " 
        str += blockObj.checkDirection 
        str += " == Star ) {"
        let codeObj = {
          codeObjStr: null,
          codeObjUID: null,
        }
        codeObj.codeObjStr = str
        codeObj.codeObjUID = blockObj.uid
        this.codeArray.splice(this.lineCount, 0, codeObj)

        this.lineCount++
        this.indentCount++
        
        
        this.generatingCodeArray(blockObj.children[0][0])
        
        this.indentCount--
        
        str = ""
        for(let i = 0; i < this.indentCount+1; i++){
          str += this.spaceStr
        }
        if(this.lineCount >= 10 && this.lineCount < 100){
          str = str.slice(0,-4)
        }
        else if(this.lineCount >= 100){
          str = str.slice(0,-8)
        }
        str += this.spaceStr2
        str += "}"
        let codeObj1 = {
          codeObjStr: null,
          codeObjUID: null,
        }
        codeObj1.codeObjStr = str
        codeObj1.codeObjUID = blockObj.uid
        this.codeArray.splice(this.lineCount, 0, codeObj1)
        this.lineCount++


        str = ""
        for(let i = 0; i < this.indentCount+1; i++){
          str += this.spaceStr
        }
        if(this.lineCount >= 10 && this.lineCount < 100){
          str = str.slice(0,-4)
        }
        else if(this.lineCount >= 100){
          str = str.slice(0,-8)
        }

        str += this.spaceStr2
        str += " else {"
        let codeObj2 = {
          codeObjStr: null,
          codeObjUID: null,
        }
        codeObj2.codeObjStr = str
        codeObj2.codeObjUID = blockObj.uid
        this.codeArray.splice(this.lineCount, 0, codeObj2)

        this.lineCount++
        this.indentCount++
        
        
        this.generatingCodeArray(blockObj.children[1][0])
        
        this.indentCount--
        
        str = ""
        for(let i = 0; i < this.indentCount+1; i++){
          str += this.spaceStr
        }
        if(this.lineCount >= 10 && this.lineCount < 100){
          str = str.slice(0,-4)
        }
        else if(this.lineCount >= 100){
          str = str.slice(0,-8)
        }
        str += this.spaceStr2
        str += "}"
        let codeObj3 = {
          codeObjStr: null,
          codeObjUID: null,
        }
        codeObj3.codeObjStr = str
        codeObj3.codeObjUID = blockObj.uid
        this.codeArray.splice(this.lineCount, 0, codeObj3)
        this.lineCount++
      }
      if(blockObj.blockID == 12){
        let str = ""
        for(let i = 0; i < this.indentCount+1; i++){
          str += this.spaceStr
        }
        if(this.lineCount >= 10 && this.lineCount < 100){
          str = str.slice(0,-4)
        }
        else if(this.lineCount >= 100){
          str = str.slice(0,-8)
        }

        str += this.spaceStr2
        str += "if ( " 
        str += blockObj.checkDirection 
        str += " == Fire || "
        str += blockObj.checkDirection 
        str += " == Cross ) {"
        let codeObj = {
          codeObjStr: null,
          codeObjUID: null,
        }
        codeObj.codeObjStr = str
        codeObj.codeObjUID = blockObj.uid
        this.codeArray.splice(this.lineCount, 0, codeObj)

        this.lineCount++
        this.indentCount++
        
        
        this.generatingCodeArray(blockObj.children[0][0])
        
        this.indentCount--
        
        str = ""
        for(let i = 0; i < this.indentCount+1; i++){
          str += this.spaceStr
        }
        if(this.lineCount >= 10 && this.lineCount < 100){
          str = str.slice(0,-4)
        }
        else if(this.lineCount >= 100){
          str = str.slice(0,-8)
        }
        str += this.spaceStr2
        str += "}"
        let codeObj1 = {
          codeObjStr: null,
          codeObjUID: null,
        }
        codeObj1.codeObjStr = str
        codeObj1.codeObjUID = blockObj.uid
        this.codeArray.splice(this.lineCount, 0, codeObj1)
        this.lineCount++


        str = ""
        for(let i = 0; i < this.indentCount+1; i++){
          str += this.spaceStr
        }
        if(this.lineCount >= 10 && this.lineCount < 100){
          str = str.slice(0,-4)
        }
        else if(this.lineCount >= 100){
          str = str.slice(0,-8)
        }

        str += this.spaceStr2
        str += " else {"
        let codeObj2 = {
          codeObjStr: null,
          codeObjUID: null,
        }
        codeObj2.codeObjStr = str
        codeObj2.codeObjUID = blockObj.uid
        this.codeArray.splice(this.lineCount, 0, codeObj2)

        this.lineCount++
        this.indentCount++
        
        
        this.generatingCodeArray(blockObj.children[1][0])
        
        this.indentCount--
        
        str = ""
        for(let i = 0; i < this.indentCount+1; i++){
          str += this.spaceStr
        }
        if(this.lineCount >= 10 && this.lineCount < 100){
          str = str.slice(0,-4)
        }
        else if(this.lineCount >= 100){
          str = str.slice(0,-8)
        }
        str += this.spaceStr2
        str += "}"
        let codeObj3 = {
          codeObjStr: null,
          codeObjUID: null,
        }
        codeObj3.codeObjStr = str
        codeObj3.codeObjUID = blockObj.uid
        this.codeArray.splice(this.lineCount, 0, codeObj3)
        this.lineCount++
      }
      if(blockObj.blockID == 13){
        let str = ""
        for(let i = 0; i < this.indentCount+1; i++){
          str += this.spaceStr
        }
        if(this.lineCount >= 10 && this.lineCount < 100){
          str = str.slice(0,-4)
        }
        else if(this.lineCount >= 100){
          str = str.slice(0,-8)
        }
        str += this.spaceStr2
        str += " mazeMovement( );"
        let codeObj = {
          codeObjStr: null,
          codeObjUID: null,
        }
        codeObj.codeObjStr = str
        codeObj.codeObjUID = blockObj.uid
        this.codeArray.splice(this.lineCount, 0, codeObj)
        this.lineCount++
      }
      if(blockObj.blockID == 14){
        let str = ""
        for(let i = 0; i < this.indentCount+1; i++){
          str += this.spaceStr
        }
        if(this.lineCount >= 10 && this.lineCount < 100){
          str = str.slice(0,-4)
        }
        else if(this.lineCount >= 100){
          str = str.slice(0,-8)
        }
        str += this.spaceStr2
        str += " NDEMovement( );"
        let codeObj = {
          codeObjStr: null,
          codeObjUID: null,
        }
        codeObj.codeObjStr = str
        codeObj.codeObjUID = blockObj.uid
        this.codeArray.splice(this.lineCount, 0, codeObj)
        this.lineCount++
      }
    }
  },
  mounted: function(){
    for(let i = 0; i < this.$parent.$children.length; i++){
      if(this.$parent.$children[i].$options._componentTag == "MainBlock"){
        this.vmMainBlock = this.$parent.$children[i]
      }
    }

    this.codeObj = this.vmMainBlock.rootObj
    this.generatingCodeArray(this.codeObj)
  },
}
</script>

<style scoped>
  #codeCompiled{
    background-color: rgb(223, 198, 161);
    padding: 10px 100px 10px 50px;
    text-align: left;
  }
</style>