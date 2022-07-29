export class responseRust {
  /**
   * 数据主体，账号信息
   */
  data: any;
  /**
   * 状态描述
   */
  message: string;
  /**
   * 状态编码
   */
  status: number;
  /**
   * 处理时间
   */
  timestamp: string;
  success(): responseRust {
    const rus = new responseRust();
    rus.status = 200;
    rus.message = "成功";
    rus.timestamp = "";
    return rus;
  }
  error(): responseRust {
    const rus = new responseRust();
    rus.status = 201;
    rus.message = "失败";
    rus.timestamp = "";
    return rus;
  }

  success_data(data: any) {
    const rus = new responseRust();
    rus.status = 200;
    rus.message = "成功";
    rus.timestamp = "";
    rus.data = data;
    return rus;
  }
}
