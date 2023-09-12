// 导出excel
import * as XLSX from 'xlsx'

/**
 * @description: 交易弹窗
 * @param {
 *    excelData: excel数据。对象数组
 *    fileName: 文件名称。
 *    headers: 自定义表头
 * }
 * @return {*}
 */
const exportExcel = (excelData, fileName = 'name', headers = {}) => {
    if (!excelData) return
    const wb = XLSX.utils.book_new()
    const header = Object.keys(headers)
    const isSkipHeader = JSON.stringify(headers) !== '{}'
    if (isSkipHeader) {
        excelData.unshift(headers)
    }
    const sheet = XLSX.utils.json_to_sheet(excelData, {
        header,
        skipHeader: isSkipHeader,
    })
    XLSX.utils.book_append_sheet(wb, sheet, fileName)
    XLSX.writeFile(wb, `${fileName}.xlsx`)
}

export default exportExcel

// 如何使用

const handleExport = useCallback(() => {
    const newData = []
    allData.map((item) => {
        const obj = {}
        obj['add_time'] = formateUTCTimeTwoTwo(item['add_time'])
        obj['address'] = item['address']
        obj['twitter'] = item['twitter']
        obj['discord'] = item['discord']
        newData.push(obj)
    })
    const headers = {
        add_time: 'Add date',
        address: 'Wallet address',
        twitter: 'Twitter',
        discord: 'Discord',
    }
    exportExcel(newData, 'winnerList', headers)
}, [allData])
