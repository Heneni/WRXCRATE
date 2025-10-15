// --- Begin CSV Loader and Data Initialization ---
async function loadCsvFromGithub(url) {
  const response = await fetch(url);
  const text = await response.text();
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",");
  return lines.slice(1).map(line => {
    const values = line.split(",");
    const record = {};
    headers.forEach((header, i) => {
      record[header.trim()] = values[i] ? values[i].trim() : "";
    });
    if (record.cover) record.cover = record.cover.replace('http://','https://');
    return record;
  });
}

const csvUrl = "https://raw.githubusercontent.com/Heneni/WRXCRATE/main/data/records.csv";

let r;
let i;

// The rest of your app depends on i (the cratedigger instance)
// and calls i.loadRecords(r, true) to populate records and activate UI.

window.addEventListener('DOMContentLoaded', () => {
  i = e.cratedigger;
  loadCsvFromGithub(csvUrl).then(records => {
    r = records;
    i.loadRecords(r, true);
  }).catch(err => console.error("Failed to load CSV:", err));
});

// --- All original UI and functionality code goes below ---

!function e(t,a,o){function n(r,s){if(!a[r]){if(!t[r]){var c="function"==typeof require&&require;if(!s&&c)return c(r,!0);if(i)return i(r,!0);var l=new Error("Cannot find module '"+r+"'");throw l.code="MODULE_NOT_FOUND",l}var d=a[r]={exports:{}};t[r][0].call(d.exports,function(e){var a=t[r][1][e];return n(a?a:e)},d,d.exports,e,t,a,o)}return a[r].exports}for(var i="function"==typeof require&&require,r=0;r<o.length;r++)n(o[r]);return n}({/* ...rest of minified bundle goes here... */});

