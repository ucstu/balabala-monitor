<template>
  <div class="panel" style="">
    <div class="title">发布文章</div>
    <div class="form-item">
      <div class="label required category-label">分类：</div>
      <div class="form-item-content category-list">
        <div class="item" v-for="item in labelList">{{ item }}</div>
      </div>
    </div>
    <div class="form-item">
      <div class="label required">添加标签：</div>
      <div class="form-item-content">
        <div data-v-719180a7="" class="tag-input select">
          <div
            data-v-719180a7=""
            class="select-plus byte-select byte-select--normal"
            style="width: 100%"
          >
            <div class="byte-select__wrap">
              <div class="byte-select__content-wrap">
                <div class="byte-select__placeholder">请搜索添加标签</div>
                <!----><input class="byte-select__input" style="width: 100%" />
              </div>
              <div class="byte-select__icon-wrap"></div>
              <span
                class="byte-select__input"
                style="
                  height: 0px;
                  overflow: hidden;
                  position: absolute;
                  max-width: 100%;
                "
              ></span>
              <div
                class="byte-select-dropdown byte-select-dropdown--multiple tag-select-add-margin"
                style="width: 0px; display: none"
              >
                <div class="byte-select-dropdown__wrap" style="">
                  <!---->
                  <div data-v-719180a7="" class="tag-number-container">
                    你还能添加
                    <span data-v-719180a7="" class="tag-number">1</span> 个标签
                  </div>
                  <li
                    data-v-719180a7=""
                    class="byte-select-option byte-select-option--hover"
                    classname="tag-option"
                    role="button"
                  >
                    前端
                  </li>
                  <li
                    data-v-719180a7=""
                    class="byte-select-option"
                    classname="tag-option"
                    role="button"
                  >
                    后端
                  </li>
                  <li
                    data-v-719180a7=""
                    class="byte-select-option"
                    classname="tag-option"
                    role="button"
                  >
                    JavaScript
                  </li>
                  <li
                    data-v-719180a7=""
                    class="byte-select-option"
                    classname="tag-option"
                    role="button"
                  >
                    GitHub
                  </li>
                  <li
                    data-v-719180a7=""
                    class="byte-select-option"
                    classname="tag-option"
                    role="button"
                  >
                    面试
                  </li>
                  <li
                    data-v-719180a7=""
                    class="byte-select-option"
                    classname="tag-option"
                    role="button"
                  >
                    Vue.js
                  </li>
                  <li
                    data-v-719180a7=""
                    class="byte-select-option"
                    classname="tag-option"
                    role="button"
                  >
                    架构
                  </li>
                  <li
                    data-v-719180a7=""
                    class="byte-select-option"
                    classname="tag-option"
                    role="button"
                  >
                    算法
                  </li>
                  <li
                    data-v-719180a7=""
                    class="byte-select-option"
                    classname="tag-option"
                    role="button"
                  >
                    代码规范
                  </li>
                  <li
                    data-v-719180a7=""
                    class="byte-select-option"
                    classname="tag-option"
                    role="button"
                  >
                    CSS
                  </li>
                </div>
                <!---->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="form-item">
      <div class="label">文章封面：</div>
      <div class="form-item-content">
        <div data-v-cfaa5564="" class="coverselector_container">
          <div data-v-cfaa5564="">
            <button data-v-cfaa5564="" class="select-btn">
              <div data-v-cfaa5564="" class="button-slot">
                <img
                  data-v-cfaa5564=""
                  src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web_editor/img/add.0e2d17b6.svg"
                  height="20"
                  alt="add_cover"
                />
                <div data-v-cfaa5564="" class="upload">上传封面</div>
              </div>
            </button>
            <div data-v-cfaa5564="" class="addvice">建议尺寸：1303*734px</div>
          </div>
          <input data-v-cfaa5564="" type="file" style="display: none" />
        </div>
      </div>
    </div>
    <div class="form-item column-line">
      <div class="label">收录至专栏：</div>
      <div class="form-item-content">
        <div data-v-5c289105="" class="container select">
          <div
            data-v-5c289105=""
            class="byte-select byte-select--normal"
            style="width: 100%"
          >
            <div class="byte-select__wrap">
              <div class="byte-select__content-wrap">
                <div class="byte-select__placeholder">
                  请搜索添加专栏，同一篇文章最多添加三个专栏
                </div>
                <!----><input class="byte-select__input" style="width: 100%" />
              </div>
              <div class="byte-select__icon-wrap"></div>
              <span
                class="byte-select__input"
                style="
                  height: 0px;
                  overflow: hidden;
                  position: absolute;
                  max-width: 100%;
                "
              ></span>
              <div
                class="byte-select-dropdown byte-select-dropdown--multiple"
                style="width: 0px; display: none"
              >
                <div class="byte-select-dropdown__wrap" style="">
                  <!---->
                  <li
                    data-v-5c289105=""
                    class="byte-select-option byte-select-option--hover"
                  >
                    React 学习
                  </li>
                </div>
                <!---->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="summary-box form-item">
      <div class="label required">编辑摘要：</div>
      <div class="summary form-item-content">
        <span style="color: rgb(238, 77, 56)"> 0/100 </span>
        <div class="summary-textarea byte-input byte-input--normal">
          <textarea
            maxlength="100"
            rows="5"
            placeholder=""
            autocomplete=""
            name=""
            aria-label=""
            spellcheck="false"
            class="byte-input__textarea"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="footer">
      <!---->
      <div class="btn-container">
        <button
          data-v-c341d750=""
          class="ui-btn btn line medium default"
          style="margin-right: 16px"
        >
          <!---->
          取消</button
        ><button
          data-v-c341d750=""
          class="ui-btn btn primary medium default"
          st:name="publishBtn"
        >
          <!---->
          确定并发布
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const labelList = [
  "后端",
  "前端",
  "Android",
  "iOS",
  "人工智能",
  "开发工具",
  "代码人生",
  "阅读",
];
</script>

<style lang="scss" scoped>
.panel {
  position: absolute;
  margin: 1.8rem -3rem 0 0;
  top: 100%;
  right: 0;
  width: 560px;
  font-size: 1.2rem;
  white-space: nowrap;
  color: #909090;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 2px;
  -webkit-box-shadow: 0 1px 2px #f1f1f1;
  box-shadow: 0 1px 2px #f1f1f1;
  cursor: default;
  z-index: 100;
}
</style>
