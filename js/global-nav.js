// 导航栏搜索功能（集成到Butterfly默认导航栏）
(function() {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const searchResults = document.getElementById('search-results');
  
  function performSearch() {
    const query = searchInput.value.trim();
    if (query.length > 0) {
      // 使用Butterfly主题的本地搜索
      if (typeof localSearch !== 'undefined') {
        const results = localSearch.search(query);
        displaySearchResults(results);
      } else if (typeof hexoSearch !== 'undefined') {
        const results = hexoSearch.search(query);
        displaySearchResults(results);
      } else {
        if (searchResults) {
          searchResults.classList.add('show');
          searchResults.innerHTML = '<div class="search-result-item" style="padding: 12px 15px; text-align: center; color: #999; font-size: 0.9rem;">搜索功能需要配置本地搜索插件</div>';
        }
      }
    } else {
      if (searchResults) {
        searchResults.classList.remove('show');
        searchResults.innerHTML = '';
      }
    }
  }
  
  // 搜索功能（集成在Butterfly导航栏中）
  if (searchInput) {
    // 输入时显示搜索结果
    searchInput.addEventListener('input', performSearch);
    
    // 按Enter键搜索
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
      }
    });
    
    // 点击输入框外部时隐藏搜索结果
    document.addEventListener('click', function(e) {
      if (searchInput && searchResults && searchBtn) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target) && !searchBtn.contains(e.target)) {
          searchResults.classList.remove('show');
        }
      }
    });
    
    // 聚焦时如果有内容，显示搜索结果
    searchInput.addEventListener('focus', function() {
      if (this.value.trim().length > 0 && searchResults) {
        searchResults.classList.add('show');
      }
    });
  }
  
  // 搜索按钮点击事件
  if (searchBtn) {
    searchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      performSearch();
      if (searchInput) {
        searchInput.focus();
      }
    });
  }
  
  function displaySearchResults(results) {
    if (!searchResults) return;
    searchResults.classList.add('show');
    
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-result-item" style="padding: 12px 15px; text-align: center; color: #999; font-size: 0.9rem;">未找到相关文章</div>';
      return;
    }
    
    let html = '';
    results.forEach(function(item) {
      html += '<div class="search-result-item" onclick="window.location.href=\'' + (item.permalink || item.url || '#') + '\'"><h3 style="margin: 0 0 5px 0; color: #333; font-size: 0.95rem; font-weight: 600;">' + (item.title || '无标题') + '</h3><p style="margin: 0; color: #666; font-size: 0.85rem; line-height: 1.4;">' + (item.excerpt || '') + '</p></div>';
    });
    searchResults.innerHTML = html;
  }
})();

