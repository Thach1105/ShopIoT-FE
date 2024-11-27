function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sky-500 to-indigo-500 py-4 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 w-10/12">
        <div>
          <img src="https://placehold.co/120x80" alt="Rang Dong Logo" />
          <h2>HỖ TRỢ KHÁCH HÀNG</h2>
          <p>
            Hotline: <strong>1900 2098 - 0898109810</strong>
          </p>
          <p>
            Kiếu nại, góp ý: <strong>19002098 - 0898109810</strong>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:rangdongstore@rangdong.com.vn">
              rangdongstore@rangdong.com.vn
            </a>
          </p>
          <p>Thời gian phục vụ: 7h30 - 17h30</p>
          <img
            src="https://placehold.co/100x50"
            alt="Đã Thông Báo Bộ Công Thương"
          />
        </div>
        <div>
          <h2>VỀ RẠNG ĐÔNG</h2>
          <p>
            <a href="#">Giới thiệu</a>
          </p>
          <p>
            <a href="#">Site map</a>
          </p>
          <p>
            <a href="#">Khuyến mãi</a>
          </p>
          <p>
            <a href="#">Cẩm nang Rạng Đông</a>
          </p>
          <p>
            <a href="#">Chính sách bảo mật</a>
          </p>
          <p>
            <a href="#">Điều khoản sử dụng</a>
          </p>
          <p>
            <a href="#">Chính sách giải quyết khiếu nại</a>
          </p>
        </div>
        <div>
          <h2>CHĂM SÓC KHÁCH HÀNG</h2>
          <p>
            <a href="#">Hướng dẫn đặt hàng</a>
          </p>
          <p>
            <a href="#">Chính sách vận chuyển</a>
          </p>
          <p>
            <a href="#">Chính sách thanh toán</a>
          </p>
          <p>
            <a href="#">Chính sách đổi hàng</a>
          </p>
          <p>
            <a href="#">Chính sách bảo hành</a>
          </p>
          <p>
            <a href="#">Chính sách hủy đơn</a>
          </p>
          <p>
            <a href="#">Những câu hỏi thường gặp</a>
          </p>
        </div>
        <div>
          <h2>PHƯƠNG THỨC THANH TOÁN</h2>
          <div className="flex space-x-2 p-3">
            <img src="./zalopay-logo.png" alt="ZaloPay" className="h-14 w-14" />
            <img src="./vnpay-logo.jpg" alt="VNPay" className="h-14 w-14" />
            <img src="./cod.png" alt="COD" className="h-14 w-14 bg-white" />
          </div>
          {/* <h2 className="mt-4">TẢI ỨNG DỤNG</h2>
          <div className="flex space-x-2">
            <img src="https://placehold.co/100x50" alt="App Store" />
            <img src="https://placehold.co/100x50" alt="Google Play" />
          </div> */}
        </div>
      </div>
      <div className="mt-8 border-t border-white pt-4 w-10/12 mx-auto">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <img src="https://placehold.co/100x50" alt="Voucher" />
            <p>CÔNG TY CP BÓNG ĐÈN PHÍCH NƯỚC RẠNG ĐÔNG</p>
            <p>Số 87 - 89 Hạ Đình, Thanh Xuân, Hà Nội.</p>
            <p>
              ©2024 - Bản quyền của Công ty CP Bóng đèn Phích nước Rạng Đông.
              RangDongStore.vn
            </p>
            <p>
              GPDKKD số: 0103004893 do Sở KHĐT TP Hà Nội cấp ngày 15/07/2004
            </p>
            {/* <div className="flex items-center mt-2">
              <div className="bg-red-600 text-white px-4 py-2 rounded-full">
                <i className="fas fa-phone-alt"></i> 1900.2098
              </div>
            </div> */}
          </div>
          <div className="text-center md:text-right">
            <h2>Kết nối với chúng tôi</h2>
            <div className="social-icons flex justify-center md:justify-end mt-2 gap-4 items-center pr-6">
              <a href="#">
                <img src="./icon-fb.png" alt="facebook" className="h-14 w-14" />
              </a>
              <a href="#">
                <img
                  src="./icon-youtube.png"
                  alt="youtube"
                  className="h-14 w-14"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
