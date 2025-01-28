# -*- coding: utf-8 -*-
# @Time    : 2025/1/28 10:40
# @Author  : AI悦创
# @FileName: status.py.py
# @Software: PyCharm
# @Blog    ：https://bornforthis.cn/
# Created by Bornforthis.
# 文件： api/status.py
import requests


# Vercel Python Serverless Function 使用以下函数签名：
# 详情可参考官方文档 https://vercel.com/docs/concepts/functions/serverless-functions/python
def handler(request):
    # 定义需要监测的站点清单（可自行添加/修改）
    websites = [
        {"name": "AI悦创", "url": "https://bornforthis.cn/"},
        {"name": "别碰我的镜头盖", "url": "https://blog.bornforthis.cn/"},
        {"name": "CHYTT", "url": "https://example3.com/"},
        {"name": "Elyki", "url": "https://example4.com/"},
        {"name": "Test", "url": "https://test.bornforthis.com/"},
    ]

    results = []
    for site in websites:
        try:
            resp = requests.get(site["url"], timeout=5)
            # 这里只做一个简单判断：返回 200 视为“正常”，否则视为“异常”
            if resp.status_code == 200:
                status_text = "正常访问"
            else:
                status_text = f"异常，状态码：{resp.status_code}"
        except Exception as e:
            # 网络错误、超时等都视为无法访问
            status_text = f"无法访问，错误：{str(e)}"

        results.append({
            "name": site["name"],
            "url": site["url"],
            "status": status_text
        })

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json; charset=utf-8"},
        "body": results
    }
