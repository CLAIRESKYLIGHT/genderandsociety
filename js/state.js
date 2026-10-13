/**
 * BENA — State Management
 * Handles local vows, visits, theme preferences, and book progress
 */

import { Storage } from "./utils.js";

const KEYS = {
  VISITED: "bena_has_visited",
  VOWS: "bena_user_vows_v4",
  CANDLES: "bena_candle_count_v4",
  THEME: "bena_theme_mode",
  BOOK_PAGE: "bena_book_page_index",
  BOOK_INTRO_TYPED: "bena_book_intro_typed",
};

export const State = {
  hasVisited() {
    return !!Storage.get(KEYS.VISITED, false);
  },

  setVisited(val = true) {
    Storage.set(KEYS.VISITED, val);
  },

  getVows() {
    return Storage.get(KEYS.VOWS, []);
  },

  addVow(text) {
    const vows = this.getVows();
    const newVow = {
      id: "vow_" + Date.now(),
      text: text.trim().slice(0, 200),
      timestamp: new Date().toISOString(),
    };
    vows.unshift(newVow);
    Storage.set(KEYS.VOWS, vows);
    this.incrementCandleCount();
    return newVow;
  },

  deleteVow(id) {
    const vows = this.getVows().filter((v) => v.id !== id);
    Storage.set(KEYS.VOWS, vows);
    return vows;
  },

  getCandleCount() {
    return Storage.get(KEYS.CANDLES, 1248);
  },

  incrementCandleCount() {
    const current = this.getCandleCount() + 1;
    Storage.set(KEYS.CANDLES, current);
    return current;
  },

  getTheme() {
    return "light";
  },

  setTheme() {
    Storage.set(KEYS.THEME, "light");
    document.documentElement.setAttribute("data-theme", "light");
  },

  getBookPage() {
    return Storage.get(KEYS.BOOK_PAGE, 0);
  },

  setBookPage(idx) {
    Storage.set(KEYS.BOOK_PAGE, idx);
  },

  hasTypedBookIntro() {
    return !!Storage.get(KEYS.BOOK_INTRO_TYPED, false);
  },

  setBookIntroTyped(value = true) {
    Storage.set(KEYS.BOOK_INTRO_TYPED, value);
  },

  clearAllData() {
    Object.values(KEYS).forEach((k) => Storage.remove(k));
  },

  exportAllData() {
    return JSON.stringify(
      {
        visited: this.hasVisited(),
        vows: this.getVows(),
        candleCount: this.getCandleCount(),
        theme: this.getTheme(),
        exportedAt: new Date().toISOString(),
      },
      null,
      2,
    );
  },
};
