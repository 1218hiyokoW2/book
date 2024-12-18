'use strict';

PetiteVue.createApp({
  books: false,
  keyword: '', // ユーザが入力した検索キーワード
  error: '', // エラーメッセージ

  async getBookList() {
    this.error = null; // 前回のエラーをリセット
    this.books = null; // 前回の検索結果をリセット

    if (!this.keyword) {
      this.error = 'キーワードを入力してください。';
      return;
    }

    const ApplicationId = 'e06e2a5afcf14b52139c1fb6c58e9dbc'; // 楽天APIのアプリID
    const url = `https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&`;
    const url2 = `&booksGenreId=000&applicationId=${ApplicationId}`;

    const query = new URLSearchParams({
      keyword: this.keyword
    });
    // console.log(query);

    const res = await fetch(url + query + url2);

    if (res.ok) {
      const data = await res.json();
      this.books = data.books[this.keyword];
    } else {
      this.error = 'データの取得に失敗しました。もう一度お試しください。';
      console.error(`${res.status} : ${res.statusText}`);
    }

    // try {
    //   const res = await fetch(url);
    //   if (!res.ok) {
    //     throw new Error(`${res.status} : ${res.statusText}`);
    //   }

    //   const data = await res.json();
    //   this.books = data.Items || [];
    // } catch (err) {
    //   this.error = 'データの取得に失敗しました。もう一度お試しください。';
    //   console.error(err);
    // }
  }
}).mount();
