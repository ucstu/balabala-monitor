export interface ActionInfo {
  title?: string; // 类型名称
  time?: string; // 发生时间
  pageUrl?: string; //发生页面
  listType?: number;
  mainType?: number;
  subType?: number;
  content?: string; //发生内容
  resourceType?: string; //资源类型
  path?: string; // 资源路径
  url?: string; // 文件路径
  msg?: string; // 错误消息
  line?: number; // 错误行号
  column?: number; // 错误列号
  stack?: string; // 错误调用堆栈
  value?: number; // 指标数值
  left?: number; // 点击位置距离页面左端距离
  top?: number; // 点击位置距离页面顶端距离
  target?: string; // 点击对象
  inner?: string; // 内部文本
  from?: string; // 路由跳转起步位置
  to?: string; // 路由跳转目的位置
  params?: string; // 路径参数
  query?: string; // 查询参数
  statusCode?: number; // 状态码
  method?: string; // 接口状态码
  duration?: number; // 接口耗时
  data?: string; // 返回数据
}
