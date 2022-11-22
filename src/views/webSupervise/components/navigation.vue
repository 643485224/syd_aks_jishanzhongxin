<template>
        <div class="nav-lits">
            <div class="nav">
                <ul>
                <li :class="inde ==1?'ative':''" @click="chideadd(1)">
                    <div class="img">
                    <img src="./img/Slice74.png" alt="">
                    </div>
                    <div class="li-item">
                        <span>药品</span>
                        <span>Drugs</span>
                    </div>
                    </li>
                <li :class="inde ==2?'ative':''" @click="chideadd(2)"> <div class="img">
                    <img src="./img/Slice75.png" alt="">
                    </div>
                    <div class="li-item">
                        <span>医疗器械</span>
                        <span>Medical Devices</span>
                    </div></li>
                <li :class="inde ==3?'ative':''" @click="chideadd(3)">
                    <div class="img">
                    <img src="./img/Slice76.png" alt="">
                    </div>
                    <div class="li-item">
                        <span>企业监管</span>
                        <span>Corporate governance</span>
                    </div>
                </li>
            </ul>
            </div>
        </div>
</template>
<script>
export default {
    props:['index'],
    data () {
        return {
            inde:this.index
        }
    },
    methods: {
        chideadd(id){
            console.log(id);
            this.inde = id
            if(id == 1){
                this.$router.push('/webSuperviseMain/webSuperviseDrugs');//药品
            } else if(id == 2){
                this.$router.push('/webSuperviseMain/webSuperviseEnterprise');//医疗器械
            } else if(id == 3){
                this.$router.push('/webSuperviseMain/webSuperviseMedicalEquipment'); //企业
            }
        }
    }
}
</script>
<style lang="scss" scoped>
  .nav-lits{
    width: 100%;
    .nav{
        width: 1200px;
        margin:0 auto;
        ul{
            height: 123px;
            display: flex;
            list-style: none;
            padding: 0 93px 0 50px;
            justify-content: space-between;
            align-items: center;
            li{
                display: flex;
                align-items:center;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
                padding: 5px 0;
                .img{
                    width: 70px;
                    height: 70px;
                    margin-right: 8px;
                }
                .li-item{
                    display: flex;
                flex-direction: column;
                span{
                    font-size: 21px;
                    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
                    font-weight: bold;
                    color: #FFFFFF;
                }
                }
            }
            .ative{
                border-top: 6px solid rgba(255,255,255,0.5);
                border-bottom: 6px solid rgba(255,255,255,0.5);
            }
           
        }
    }
 }
</style>