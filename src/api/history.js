import Promise from 'bluebird'
import _fp from 'lodash/fp'

const searchHistoryKey = "searchHistory-d200f6dd-1687-4579-aaa0-a8f7444248cc"

const safeGetStorageItem = key => {
  const item = localStorage.getItem(key)
  if (!item) {
    return undefined
  }
  return JSON.parse(item)
}

export const pushSearch = ({ search }) => {
  let storedSearchHistory = safeGetStorageItem(searchHistoryKey)
  if (!storedSearchHistory) {
    storedSearchHistory = []
    localStorage.setItem(searchHistoryKey, JSON.stringify(storedSearchHistory))
  }
  storedSearchHistory = storedSearchHistory.filter(_fp.negate(_fp.eq(search)))
  storedSearchHistory = [...storedSearchHistory, search]
  if (storedSearchHistory.length > 5) {
    storedSearchHistory = storedSearchHistory.slice(storedSearchHistory.length - 5)
  }
  localStorage.setItem(searchHistoryKey, JSON.stringify(storedSearchHistory))
}

export const getLastSearches = () => safeGetStorageItem(searchHistoryKey) || []
