// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use serde::Deserialize;
use tauri::Window;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// #[derive(Deserialize)]
// struct Task{
//     id: u16,
//     name: String
// }

#[tauri::command]
fn get_window_size(window: Window) -> Result<(u32, u32), String> {
    let size = window.inner_size().unwrap();
    Ok((size.width, size.height))
}

#[tauri::command]
fn message(msg: &str) -> String {
    format!("{}",msg)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, message, get_window_size])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
