<!-- here stores all the initial blocks data in the 2D array -->
<!-- when clone the block, the block object in the array will return 
			and pass to the blockHolderNodeArray in the block holder -->
<!-- this vue component will also generate a unique uid for each block when clone to the block holder-->

<!-- Usage: design the template of each block, then register here -->
<!-- each individual block vue component must return:
			1.) blockName: required String
			2.) blockID: required Number
			3.) blockType: required String; ["control" | "action"]
			4.) parent: required Number; default null
			5.) children: required Number; default null if action block or [] if control block
			6.) loopTimes: required Number or String, default 1 for looper or null 
			7.) state: required String; default null; [finished, continue, unactive]
			8.) uid: required Number; default null
-->

<template>
  <div id="blocks">
		
		<!-- blocksList2D : 2D array of block array, only 1 object in each element (i.e. m*1 2D array) -->
		<!-- block: array of block object, each block is returning an object, only 1 element in each block array -->
		<div id="blocksBody" v-for="block in blocksList2D" :key="block.id">
			<draggable
					class="dragArea list-group"
					:list="block"
					:group="{ name: 'blocks', pull: 'clone', put: false }"
					:clone="cloneBlock"
					@change="log"
			>
				
				<div class="list-group-item" v-if="block[0].blockID==0">
					<MoveLeftBlock></MoveLeftBlock>
				</div>
				
				<div class="list-group-item" v-else-if="block[0].blockID==1">
					<MoveRightBlock></MoveRightBlock>
				</div>
				
				<div class="list-group-item" v-else-if="block[0].blockID==2">
					<MoveUpBlock></MoveUpBlock>
				</div>
				
				<div class="list-group-item" v-else-if="block[0].blockID==3">
					<MoveDownBlock></MoveDownBlock>
				</div>
				
				<div class="list-group-item" v-else-if="block[0].blockID==4">
					<SequencerBlock></SequencerBlock>
				</div>

				<div class="list-group-item" v-else-if="block[0].blockID==5">
					<LooperBlock></LooperBlock>
				</div>

				<div class="list-group-item" v-else-if="block[0].blockID==6">
					<PutStarBlock></PutStarBlock>
				</div>

				<div class="list-group-item" v-else-if="block[0].blockID==7">
					<PutCrossBlock></PutCrossBlock>
				</div>

				<div class="list-group-item" v-else-if="block[0].blockID==8">
					<CheckFireBlock></CheckFireBlock>
				</div>

				<div class="list-group-item" v-else-if="block[0].blockID==9">
					<CheckStarBlock></CheckStarBlock>
				</div>

				<div class="list-group-item" v-else-if="block[0].blockID==10">
					<CheckCrossBlock></CheckCrossBlock>
				</div>

				<div class="list-group-item" v-else-if="block[0].blockID==11">
					<CheckExitBlock></CheckExitBlock>
				</div>

				<div class="list-group-item" v-else-if="block[0].blockID==12">
					<CheckFireOrCrossBlock></CheckFireOrCrossBlock>
				</div>

				<div class="list-group-item" v-else-if="block[0].blockID==13">
					<MazeMovementBlock></MazeMovementBlock>
				</div>

				<div class="list-group-item" v-else-if="block[0].blockID==14">
					<NDEMovementBlock></NDEMovementBlock>
				</div>
				
				
			</draggable>
		</div>

		<div id="customBlocksBody" v-for="block in customBlocksList2D" :key="block.id">
			<draggable
					class="dragArea list-group"
					:list="block"
					:group="{ name: 'customBlocks', 
										pull: function(to){
														if(to.el.id=='removeBlockArea'){
															customBlockDeleted = true
															return true
														}
														
														return 'clone'
													}, 
										put: false }"
					:clone="cloneBlock"
					@remove="deleteCustomBlocks"
					@change="log"
			>
				<div v-if="block.length > 0">

					<div class="list-group-item" v-if="block[0].blockID==4">
						<SequencerBlock :blockNameProp="block[0].blockName"></SequencerBlock>
					</div>

					<div class="list-group-item" v-else-if="block[0].blockID==5">
						<LooperBlock :blockNameProp="block[0].blockName"></LooperBlock>
					</div>

					<div class="list-group-item" v-else-if="block[0].blockID==8">
						<SelectorBlock :blockNameProp="block[0].blockName"></SelectorBlock>
					</div>

				</div>
				
			</draggable>
		</div>

  </div>        
</template>

<script>
import draggable from "vuedraggable";
import MoveLeftBlock from "./blocks/MoveLeftBlock.vue"
import MoveRightBlock from "./blocks/MoveRightBlock.vue"
import MoveUpBlock from "./blocks/MoveUpBlock.vue"
import MoveDownBlock from "./blocks/MoveDownBlock.vue"
import SequencerBlock from "./blocks/SequencerBlock.vue"
import LooperBlock from "./blocks/LooperBlock.vue"
import PutStarBlock from "./blocks/PutStarBlock.vue"
import PutCrossBlock from "./blocks/PutCrossBlock.vue"
import CheckFireBlock from "./blocks/CheckFireBlock.vue"
import CheckStarBlock from "./blocks/CheckStarBlock.vue"
import CheckCrossBlock from "./blocks/CheckCrossBlock.vue"
import CheckExitBlock from "./blocks/CheckExitBlock.vue"
import CheckFireOrCrossBlock from "./blocks/CheckFireOrCrossBlock.vue"
import MazeMovementBlock from "./blocks/MazeMovementBlock.vue"
import NDEMovementBlock from "./blocks/NDEMovementBlock.vue"
export default {
  name: 'Blocks',
  components:{
		draggable, 
		SequencerBlock, 
		LooperBlock, 
		MoveLeftBlock, 
		MoveRightBlock, 
		MoveUpBlock, 
		MoveDownBlock, 
		PutStarBlock, 
		PutCrossBlock, 
		CheckFireBlock, 
		CheckStarBlock, 
		CheckCrossBlock, 
		CheckExitBlock,
		CheckFireOrCrossBlock,
		MazeMovementBlock,
		NDEMovementBlock,
  },
  props:{

  },
  data: function(){
    return{
			blocksList2D:[
				[MoveLeftBlock.data().initialData],
				[MoveRightBlock.data().initialData],
				[MoveUpBlock.data().initialData],
				[MoveDownBlock.data().initialData],
				[PutStarBlock.data().initialData],
				[PutCrossBlock.data().initialData],
				[SequencerBlock.data().initialData],
				[LooperBlock.data().initialData],
				[CheckFireBlock.data().initialData],
				[CheckCrossBlock.data().initialData],
				[CheckFireOrCrossBlock.data().initialData],
				[CheckStarBlock.data().initialData],
				[CheckExitBlock.data().initialData],
				[MazeMovementBlock.data().initialData],
				[NDEMovementBlock.data().initialData],
			],
			level1blocksList2D:[
				[MoveLeftBlock.data().initialData],
				[MoveRightBlock.data().initialData],
				[MoveUpBlock.data().initialData],
				[MoveDownBlock.data().initialData],
			],
			level2blocksList2D:[
				[MoveLeftBlock.data().initialData],
				[MoveRightBlock.data().initialData],
				[MoveUpBlock.data().initialData],
				[MoveDownBlock.data().initialData],
				[LooperBlock.data().initialData],
			],
			level3blocksList2D:[
				[MoveLeftBlock.data().initialData],
				[MoveRightBlock.data().initialData],
				[MoveUpBlock.data().initialData],
				[MoveDownBlock.data().initialData],
				[LooperBlock.data().initialData],
				[SequencerBlock.data().initialData],
			],
			level4blocksList2D:[
				[MoveLeftBlock.data().initialData],
				[MoveRightBlock.data().initialData],
				[MoveUpBlock.data().initialData],
				[MoveDownBlock.data().initialData],
				[LooperBlock.data().initialData],
				[SequencerBlock.data().initialData],
			],
			level5blocksList2D:[
				[MoveLeftBlock.data().initialData],
				[MoveRightBlock.data().initialData],
				[MoveUpBlock.data().initialData],
				[MoveDownBlock.data().initialData],
				[PutStarBlock.data().initialData],
				[PutCrossBlock.data().initialData],
				[LooperBlock.data().initialData],
				[SequencerBlock.data().initialData],
			],
			level6blocksList2D:[
				[MoveLeftBlock.data().initialData],
				[MoveRightBlock.data().initialData],
				[MoveUpBlock.data().initialData],
				[MoveDownBlock.data().initialData],
				[PutCrossBlock.data().initialData],
				[LooperBlock.data().initialData],
				[SequencerBlock.data().initialData],
				[CheckFireOrCrossBlock.data().initialData],
			],
			level7blocksList2D:[
				[MoveLeftBlock.data().initialData],
				[MoveRightBlock.data().initialData],
				[MoveUpBlock.data().initialData],
				[MoveDownBlock.data().initialData],
				[PutCrossBlock.data().initialData],
				[LooperBlock.data().initialData],
				[SequencerBlock.data().initialData],
				[CheckFireOrCrossBlock.data().initialData],
				[CheckStarBlock.data().initialData],
			],
			level8blocksList2D:[
				[MazeMovementBlock.data().initialData],
				[PutStarBlock.data().initialData],
				[PutCrossBlock.data().initialData],
				[SequencerBlock.data().initialData],
				[LooperBlock.data().initialData],
				[CheckFireOrCrossBlock.data().initialData],
			],
			level9blocksList2D:[
				[MoveLeftBlock.data().initialData],
				[MoveRightBlock.data().initialData],
				[MoveUpBlock.data().initialData],
				[MoveDownBlock.data().initialData],
				[NDEMovementBlock.data().initialData],
				[PutStarBlock.data().initialData],
				[PutCrossBlock.data().initialData],
				[SequencerBlock.data().initialData],
				[LooperBlock.data().initialData],
				[CheckFireOrCrossBlock.data().initialData],
			],
			level10blocksList2D:[
				[MoveLeftBlock.data().initialData],
				[MoveRightBlock.data().initialData],
				[MoveUpBlock.data().initialData],
				[MoveDownBlock.data().initialData],
				[PutStarBlock.data().initialData],
				[PutCrossBlock.data().initialData],
				[SequencerBlock.data().initialData],
				[LooperBlock.data().initialData],
				[CheckFireOrCrossBlock.data().initialData],
				[CheckStarBlock.data().initialData],
			],
			customBlocksList2D: [],
			customBlockDeleted: false,
    }
	},
  methods:{
		log: function(evt) {
      window.console.log(evt);
		},
		cloneBlock: function(blockObj){
			var newBlockObj = this.prepareNewBlockObj(blockObj)
			return{
				blockName: newBlockObj.blockName,
				blockID: newBlockObj.blockID,
				blockType: newBlockObj.blockType,
				parent: null,
				children: newBlockObj.children,
				checkDirection: newBlockObj.checkDirection,
				loopTimes: newBlockObj.loopTimes,
				state: newBlockObj.state,
				uid: newBlockObj.uid
			}
		},
		prepareNewBlockObj: function(blockObj){
      var newBlockObj = {	blockName: null,
													blockID: null,
													blockType: null,
													parent: null,
													children: null,
													checkDirection: null,
													loopTimes: null,
													state: null,
													uid: null
                        }
			
			//if children is null, it is an action block
      if(blockObj.children == null){
        newBlockObj.blockName = blockObj.blockName
        newBlockObj.blockID = blockObj.blockID
        newBlockObj.blockType = blockObj.blockType
				newBlockObj.parent = blockObj.parent
				newBlockObj.loopTimes = blockObj.loopTimes
				newBlockObj.state = blockObj.state
				newBlockObj.uid = this.generateUID()

        return newBlockObj
      }
			
			//if children.length = 0, it is a fresh sequencer block
			if(blockObj.children.length == 0){
				newBlockObj.blockName = blockObj.blockName
        newBlockObj.blockID = blockObj.blockID
        newBlockObj.blockType = blockObj.blockType
				newBlockObj.parent = blockObj.parent
				newBlockObj.checkDirection = blockObj.checkDirection
				newBlockObj.loopTimes = blockObj.loopTimes
				newBlockObj.children = []
				newBlockObj.state = blockObj.state
				newBlockObj.uid = this.generateUID()

        return newBlockObj
			}

			//if children.length > 0, it could be a fresh/custom looper, fresh/custom selector or custom sequencer
      if(blockObj.children.length > 0){
        var i
        newBlockObj.children = []
        for(i = 0; i < blockObj.children.length; i++){
          newBlockObj.children.push([])
          if(blockObj.children[i].length > 0){
            newBlockObj.children[i][0] = this.prepareNewBlockObj(blockObj.children[i][0])
          }
        }
      }
      
      newBlockObj.blockName = blockObj.blockName
      newBlockObj.blockID = blockObj.blockID
      newBlockObj.blockType = blockObj.blockType
			newBlockObj.parent = blockObj.parent
			newBlockObj.checkDirection = blockObj.checkDirection
			newBlockObj.loopTimes = blockObj.loopTimes
			newBlockObj.state = blockObj.state
			newBlockObj.uid = this.generateUID()

      return newBlockObj
    },
		generateUID: function(){
			return Date.now() + Math.random()
		},
		deleteCustomBlocks: function(){
			if(this.customBlockDeleted){
				var i
				var j = null
				for(i = 0; i < this.customBlocksList2D.length; i++){
					if(this.customBlocksList2D[i].length == 0){
						j = i
					}
				}
				this.customBlocksList2D.splice(j, 1)			
			}
			this.customBlockDeleted = false
		}
	},
	mounted: function(){
		var vmApp = this.$root.$children[0]
		if(vmApp.currentLevel == 1){
			this.blocksList2D = this.level1blocksList2D
		}
		else if(vmApp.currentLevel == 2){
			this.blocksList2D = this.level2blocksList2D
		}
		else if(vmApp.currentLevel == 3){
			this.blocksList2D = this.level3blocksList2D
		}
		else if(vmApp.currentLevel == 4){
			this.blocksList2D = this.level4blocksList2D
		}
		else if(vmApp.currentLevel == 5){
			this.blocksList2D = this.level5blocksList2D
		}
		else if(vmApp.currentLevel == 6){
			this.blocksList2D = this.level6blocksList2D
		}
		else if(vmApp.currentLevel == 7){
			this.blocksList2D = this.level7blocksList2D
		}
		else if(vmApp.currentLevel == 8){
			this.blocksList2D = this.level8blocksList2D
		}
		else if(vmApp.currentLevel == 9){
			this.blocksList2D = this.level9blocksList2D
		}
		else if(vmApp.currentLevel == 10){
			this.blocksList2D = this.level10blocksList2D
		}
		else{
			this.blocksList2D = vmApp.currentBlockList2D
		}

		this.customBlocksList2D = vmApp.currentCustomBlockList2D
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blocksBody, #customBlocksBody{
	border: 0px solid rgb(223, 220, 220);
	margin: 15px 0px 15px 0px; 
}
.list-group-item{
	background-color:white;
	padding: 0px;
}
</style>