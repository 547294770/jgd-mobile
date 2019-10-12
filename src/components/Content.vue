<template>
    <div id="app_body" class="mui-content">
        <div id="tabbar" class="mui-control-content mui-active">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#/JgdList">
                    <span class="mui-icon mui-icon-home"><span class="mui-badge">3</span></span>
                    <div class="mui-media-body">需求单</div></a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="delivery-list.html">
                    <span class="mui-icon mui-icon-email"></span>
                    <div class="mui-media-body">送货单</div></a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="pickup-list.html">
                    <span class="mui-icon mui-icon-chatbubble"></span>
                    <div class="mui-media-body">提货单</div></a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="cost-list.html">
                    <span class="mui-icon mui-icon-location"></span>
                    <div class="mui-media-body">加工费</div></a>
                </li>
            </ul>
        </div>
        <div id="tabbar-with-map" class="mui-control-content">
            <div style="margin:10px;"></div>
                <ul class="mui-table-view">
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right">
                        公司信息
                    </a>
                </li>
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right">
                        账号和密码
                    </a>
                </li>
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right">
                        手机
                    </a>
                </li>
            </ul>
            <ul class="mui-table-view" style="margin-top: 25px;">
                <li class="mui-table-view-cell">
                    <a style="text-align: center;color: #FF3B30;">
                        退出登录
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
}
</script>
<style scoped>

</style>
