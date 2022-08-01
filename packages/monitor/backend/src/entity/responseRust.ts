import { format } from "src/utils/timeUtils";

export class responseRust {
  /**
   * 数据主体
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
  static success(): responseRust {
    const rus = new responseRust();
    rus.status = 200;
    rus.message = "OK";
    rus.timestamp = format(new Date());
    return rus;
  }
  static error(message: string = "error"): responseRust {
    const rus = new responseRust();
    rus.status = 500;
    rus.message = message;
    rus.timestamp = format(new Date());
    return rus;
  }

  static success_data(data: any) {
    const rus = new responseRust();
    rus.status = 200;
    rus.message = "OK";
    rus.timestamp = format(new Date());
    rus.data = data;
    return rus;
  }
  static success_creat(): responseRust {
    const rus = new responseRust();
    rus.status = 201;
    rus.message = "Created";
    rus.timestamp = format(new Date());
    return rus;
  }
}
