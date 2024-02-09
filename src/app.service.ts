/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://www.amazon.com/books-used-books-textbooks/b?ie=UTF8&node=283155';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: "Bookstore API is running",
      author: "Hanibal Girmay",
      doc: '/docs'
    };
  }

  async getBookFromAmazon() {
    await axios.get(url)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        // Extract book titles
        const bookTitles = [];
        console.log($('.p13n-gridRow #gridItemRoot').length);

        $('.p13n-gridRow #gridItemRoot').each((index, element) => {
          console.log('====================================');
          console.log(index);
          console.log('====================================');
          // Extracting the title
          const title = $(element).find('.p13n-sc-truncate-desktop-type2').text().trim();

          // Extracting the image URL
          const image = $(element).find('img.a-dynamic-image').attr('src');

          // Extracting the price
          const price = $(element).find('.a-size-base.a-color-price ._cDEzb_p13n-sc-price_3mJ9Z').text().trim();

          // Extracting the star rating
          const rating = $(element).find('.a-icon-alt').text().trim();

          bookTitles.push({ title, price, rating, image });
        });

        // Print the extracted book titles
        console.log(bookTitles);
        return bookTitles;
      })
      .catch(error => {
        console.log(error);
      });
    //return 'getting data from amazon book!';
  }
}
