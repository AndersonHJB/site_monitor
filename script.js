// 文件： script.js

// 站点状态获取 + 渲染
async function fetchAndRenderStatus() {
  const statusContainer = document.getElementById('status-container');
  const updateTimeSpan = document.getElementById('update-time');

  // 每次刷新前先清空
  statusContainer.innerHTML = '';

  try {
    // 请求后端 API，获取各站点状态
    const res = await fetch('/api/status');
    const data = await res.json();

    // 遍历结果并创建 DOM
    data.forEach(site => {
      const item = document.createElement('div');
      item.classList.add('status-item');

      const nameDiv = document.createElement('div');
      nameDiv.classList.add('site-name');
      nameDiv.textContent = site.name;

      const statusDiv = document.createElement('div');
      // 根据返回状态文本包含“正常”还是“异常/无法访问”，判断样式
      if (site.status.includes('正常')) {
        statusDiv.classList.add('status-normal');
      } else {
        statusDiv.classList.add('status-error');
      }
      statusDiv.textContent = site.status;

      item.appendChild(nameDiv);
      item.appendChild(statusDiv);

      statusContainer.appendChild(item);
    });

    // 更新“上次刷新时间”
    const now = new Date();
    updateTimeSpan.textContent = `更新于：${now.toLocaleString()}`;
  } catch (err) {
    console.error('获取站点状态失败：', err);
    statusContainer.innerHTML = '<p style="color:red;">获取站点状态失败，请稍后重试。</p>';
  }
}

// 进入页面时先获取一次
fetchAndRenderStatus();

// 可选：每隔 60 秒自动刷新一次
setInterval(fetchAndRenderStatus, 60000);
