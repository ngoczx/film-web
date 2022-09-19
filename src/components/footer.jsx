import React from 'react';
import { BsGithub, BsFacebook } from 'react-icons/bs';

const Footer = () => {
  return (
    <div
      id="footer"
      className="mt-10"
      style={{
        backgroundImage: `url(https://xemphim.vip/static/skin/footer-bg.jpg)`,
      }}
    >
      <div className="lg:mx-40 md:mx-20 mx-10 py-20">
        <h2 className="mb-10 text-xl">
          Phim chất lượng cao online của{' '}
          <span>
            <img
              src="https://i.imgur.com/qcjuAVR.png"
              className="inline"
              alt="logo"
            ></img>
          </span>{' '}
          khác gì so với các trang phim khác?
        </h2>
        <ul className="list-disc text-gray-400">
          <li>
            Là phim bluray (reencoded), có độ phân giải thấp nhất là Full HD
            (1080p), trong khi hầu hết các trang phim khác chỉ có tới độ phân
            giải HD (720p) là cao nhất
          </li>
          <li>
            Chất lượng cao, lượng dữ liệu trên giây (bitrate) gấp từ 5 - 10 lần
            phim online thông thường - đây là yếu tố quyết định độ nét của phim
            (thậm chí còn quan trọng hơn độ phân giải)
          </li>
          <li>
            Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các trang
            phim khác (kể cả Youtube)
          </li>
          <li>
            Phù hợp để xem trên màn hình TV, máy tính, laptop có độ phân giải
            cao
          </li>
          <li>
            Nếu không hài lòng với phụ đề có sẵn, bạn có thể tự upload phụ đề
            của riêng mình để xem online
          </li>
        </ul>
        <div className="text-center mt-10">
          <h2>Simple website coded by Bao Ngoc using TMDB API</h2>
          <div className="flex justify-center gap-3">
            <a
              href="https://www.facebook.com/ngoc.nguyen.03/"
              target="_blank"
              rel="noreferrer"
            >
              <BsFacebook />
            </a>
            <a
              href="https://github.com/ngoczx"
              target="_blank"
              rel="noreferrer"
            >
              <BsGithub />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
