export default function initResourceError(): void {
  window.addEventListener(
    "error",
    (e: ErrorEvent) => {
      console.log(e);
      // const target = e.target;
      // if (!target) return;

      // if (target. || target.href)
      //   const url = target.src || target.href;
      //   reportWithCache("ResourceError", {
      //     mainType: 1,
      //     subType: 1001,
      //     errorTime: e.timeStamp,
      //     resourceType: target.tagName,
      //     html: target.outerHTML,
      //     path: e.path
      //       .map((item: { tagName: any }) => item.tagName)
      //       .filter(Boolean),
      //     ...getBasicParams(),
      //   });
      // }
    },
    true
  );
}
