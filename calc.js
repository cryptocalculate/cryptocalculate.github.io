// calc.js
function calculatePosition() {
    const openPrice = parseFloat(document.getElementById('openPrice').value);
    const leverage = parseFloat(document.getElementById('leverage').value);
    const margin = parseFloat(document.getElementById('margin').value);
    const distance = parseFloat(document.getElementById('distance').value);
    const direction = document.getElementById('direction').value;
    const openway = document.getElementById('openway').value;
    
    const positionTableBody = document.getElementById('positionTableBody');
    
    // 清空表格
    while (positionTableBody.firstChild) {
        positionTableBody.removeChild(positionTableBody.firstChild);
    }
    //console.log(openway);

    // 定義倉位數量
    let numPositions; // 在外部作用域定義 numPositions 變數

    if (openway === 'single') {
        numPositions = 1;
    } else if (openway === 'shitdad') {
        numPositions = 3;
    }
    //const numPositions = 3;
    if (numPositions !== undefined) {
        console.log(numPositions);
    } else {
        console.log('numPositions 未初始化或未被賦值');
    }    
    // 創建用於存儲資料的數組，位於迴圈外部
    const positionData = [];
    
    // 初始化第一倉的數據
    const firstPosition = {};
    if (numPositions ==1){
        firstPosition.margin =  margin;
    }
    else {
        firstPosition.margin =  margin * 0.3;
    }
    firstPosition.position = '第1倉';
    firstPosition.leverage = leverage;
    firstPosition.entryPrice = openPrice;
    
    
    
    if (direction === 'long') {
        firstPosition.stopLossPrice = openPrice - distance;
    } else if (direction === 'short') {
        firstPosition.stopLossPrice = openPrice + distance;
    }
    firstPosition.numPositions = numPositions;
    firstPosition.targetPrice1 = "-" 
    positionData.push(firstPosition);
    
    // 使用迴圈處理第二倉和第三倉的計算和添加
    for (let i = 2; i <= numPositions; i++) {
        const rowData = {}; // 創建一個用於存儲每個倉位數據的物件
        
        rowData.position = '第' + i + '倉'; // 倉位編號
        rowData.leverage = leverage * (0.5 * i + 1); // 計算倍數
        
        // 第二倉和第三倉的入場點位是前一倉的止損點位
        rowData.entryPrice = positionData[i - 2].stopLossPrice;
        rowData.targetPrice1 = positionData[i - 2].entryPrice;

        
        
        if (i==2){
            rowData.margin = margin * 0.3
            if (direction === 'long') {
                rowData.stopLossPrice = rowData.entryPrice - distance;
            } 
            else if (direction === 'short') {
                rowData.stopLossPrice = rowData.entryPrice + distance;
            }
        }
        else {
            rowData.margin =  margin * 0.4
            rowData.stopLossPrice = '系統強平'
        }
        
        rowData.numPositions = numPositions;
        // 添加數據到數組
        positionData.push(rowData);
    }
    
    // 輸出計算結果到控制台
    console.log(positionData);
    
    // 將數組的內容插入到網頁上的表格中
    for (let i = 0; i < positionData.length; i++) {
        const data = positionData[i];
        const newRow = positionTableBody.insertRow();
        
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);

        
        cell1.innerHTML = data.position;
        cell2.innerHTML = data.margin;
        cell3.innerHTML = data.leverage;
        cell4.innerHTML = data.entryPrice;
        cell5.innerHTML = data.stopLossPrice;
        cell6.innerHTML = data.targetPrice1;
    }
}


function clearFields() {
    document.getElementById('openPrice').value = '';
    document.getElementById('leverage').value = '';
    document.getElementById('margin').value = '';
    document.getElementById('distance').value = '';
    document.getElementById('direction').value = 'long';
}
