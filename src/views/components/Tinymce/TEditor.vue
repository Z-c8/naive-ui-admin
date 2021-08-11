<template>
    <div style="padding: 30px">
        <div v-html="content" style="margin-bottom: 50px"></div>
        <editor :api-key="apiKey" :init="editConfig" v-model="content" />
    </div>
</template>

<script>
// import axios from "axios";
import Editor from "@tinymce/tinymce-vue";
export default {
    components: {
        Editor,
    },
    data() {
        return {
            content: `<p style="line-height: 1.4;"><span style="font-size: 16px; font-family: 'Microsoft YaHei', 'Helvetica Neue';">1、外婆说，什么叫故乡，祖祖辈辈埋葬在这里，所以叫故乡。</span></p>
<p style="line-height: 1.4;"><span style="font-size: 16px; font-family: 'Microsoft YaHei', 'Helvetica Neue';">2、不知道什么时候起，很多事情已经很多年。</span></p>
<p style="line-height: 1.4;"><span style="font-size: 16px; font-family: 'Microsoft YaHei', 'Helvetica Neue';">3、为别人活着，也要为自己活着。</span></p>
<p style="line-height: 1.4;"><span style="font-size: 16px; font-family: 'Microsoft YaHei', 'Helvetica Neue';">4、生命是有光的。在我熄灭以前，能够照亮你一点，就是我所有能做的了。我爱你，你要记得我。</span></p>
<p style="line-height: 1.4;"><span style="font-size: 16px; font-family: 'Microsoft YaHei', 'Helvetica Neue';">5、 那么热的夏天， 少年的后背被女孩的悲伤烫出一个洞， 一直贯穿到心脏， 无数个季节的风穿越过这条通道， 有一只萤火虫在风里飞舞， 忽明忽暗。</span></p>
<p style="line-height: 1.4;"><span style="font-size: 16px; font-family: 'Microsoft YaHei', 'Helvetica Neue';">6、在大多数人心中，自己的故乡后来会成为一个点，如同亘古不变的孤岛。</span></p>
<p style="line-height: 1.4;"><span style="font-size: 16px; font-family: 'Microsoft YaHei', 'Helvetica Neue';">7、 希望和悲伤，都是一缕光。总有一天，我们会再相遇。</span></p>
<p style="line-height: 1.4;"><span style="font-size: 16px; font-family: 'Microsoft YaHei', 'Helvetica Neue';">8、十三 失散 程霜 成双 两代人终归失散 一个人心念成双</span></p>
<p style="line-height: 1.4;"><span style="font-size: 16px; font-family: 'Microsoft YaHei', 'Helvetica Neue';">9、再习惯等待，等不来依旧难过，那种难过，书上说叫做失望。直到长大后，他才明白，还有更大的难过，叫做绝望。</span></p>
<p style="line-height: 1.4;"><span style="font-size: 16px; font-family: 'Microsoft YaHei', 'Helvetica Neue';">10、有朵盛开的云，缓缓滑过山顶，随风飘向天边。我们慢慢明白，有些告别，就是最后一面。</span></p>
<p style="line-height: 1.4;"><span style="font-size: 16px; font-family: 'Microsoft YaHei', 'Helvetica Neue';">11、夏夜的歌声，冬至的歌声，都从水面掠过，皱起一层波纹，像天空坠落的泪水，又归于天空。人们随口说的一些话，跌落墙角，风吹不走，阳光烧不掉，独自沉眠。</span></p>
<p style="line-height: 1.4;"><span style="font-size: 16px; font-family: 'Microsoft YaHei', 'Helvetica Neue';">12、无论谁摊开一张信纸，写上三个字，我爱你，都或许是二十一世纪最后一封情书。</span></p>`,
            apiKey: "fmpe10wgtn5cy4tq0quwhxd21a2mb6z7pwuf0zsut09xk039", //key值从官网注册申请来的
            editConfig: {
                height: 700, //富文本高度
                language_url: "/public/tinymce/langs/zh_CN.js", //中文包
                language: "zh_CN", //中文
                browser_spellcheck: true, // 拼写检查
                branding: false, // 去水印
                elementpath: true, //禁用编辑器底部的状态栏
                statusbar: true, // 隐藏编辑器底部的状态栏
                paste_data_images: true, // 是否允许粘贴图像
                menubar: true, // 隐藏最上方menu
                fontsize_formats:
                    "14px 16px 18px 20px 24px 26px 28px 30px 32px 36px", //字体大小
                font_formats:
                    "微软雅黑=Microsoft YaHei,Helvetica Neue;PingFang SC;sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun;serifsans-serif;Terminal=terminal;monaco;Times New Roman=times new roman;times", //字体
                file_picker_types: "image",
                images_upload_credentials: true,
                plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                    "fontselect fontsizeselect link lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image quicklink h2 h3 blockquote table numlist bullist preview fullscreen",
                // 图片上传三个参数，图片数据，成功时的回调函数，失败时的回调函数
                images_upload_handler: function (blobInfo, success, failure) {
                    let formdata = new FormData();
                    formdata.append("file", blobInfo.blob());
                    // 上传图片接口，跟后端同事协调上传图片
                    // http://hh.xxxx.cn/admin/upload为上传图片接口
                    axios
                        .post("http://hh.xxxx.cn/admin/upload", formdata)
                        .then(function (res) {
                            success(res.data.data.src);
                        })
                        .catch((res) => {
                            failure("error");
                        });
                },
            },
        };
    },
};
</script>