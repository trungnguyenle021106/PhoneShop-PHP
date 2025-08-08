# Giới thiệu
## Dự án này là một website thương mại điện tử chuyên bán các sản phẩm điện thoại và phụ kiện đi kèm.

## Công nghệ sử dụng
- Frontend: HTML, JS, CSS, JQuery, AJAX
- Backend: PHP
- Cơ sở dữ liệu: MySQL

# Các chức năng chính
- **Quản lý sản phẩm**: Thêm, sửa, xóa các loại sản phẩm (điện thoại, ốp lưng, sạc, tai nghe).
- **Quản lý bán hàng**: Tạo, quản lý hóa đơn, theo dõi tình trạng đơn hàng.
- **Quản lý người dùng**: Phân quyền (Admin, Khách hàng), quản lý tài khoản, thông tin cá nhân.
- **Quản lý kho hàng**: Nhập hàng, quản lý phiếu nhập.
- **Quản lý khuyến mãi**: Tạo và áp dụng các chương trình khuyến mãi.
- **Quản lý bảo hành**: Tạo và theo dõi phiếu bảo hành sản phẩm.
- **Thống kê báo cáo**: Cung cấp các báo cáo về doanh thu theo sản phẩm, theo loại, theo thời gian


# Query DATABASE :
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2024 at 10:50 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qldienthoai`
--

-- --------------------------------------------------------

--
-- Table structure for table `cau_hinh_dien_thoai`
--

CREATE TABLE `cau_hinh_dien_thoai` (
  `MA_CHĐT` int(11) NOT NULL,
  `MA_SP` int(11) NOT NULL,
  `RAM` varchar(50) NOT NULL,
  `BO_NHO_TRONG` varchar(50) NOT NULL,
  `MAN_HINH` varchar(50) NOT NULL,
  `MAU_SAC` varchar(50) NOT NULL,
  `PIN` varchar(50) NOT NULL,
  `CAMERA_TRUOC` varchar(50) NOT NULL,
  `CAMERA_SAU` varchar(50) NOT NULL,
  `OS` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cau_hinh_dien_thoai`
--

INSERT INTO `cau_hinh_dien_thoai` (`MA_CHĐT`, `MA_SP`, `RAM`, `BO_NHO_TRONG`, `MAN_HINH`, `MAU_SAC`, `PIN`, `CAMERA_TRUOC`, `CAMERA_SAU`, `OS`) VALUES
(2, 65, '8GB', '128GB', 'Dynamic AMOLED 2X6.4\"Full HD+', 'Xanh mint', '5000Mah', '10 MPpx', 'Chính 50 MP & Phụ 12 MP, 8 MPpx', 'Android 13'),
(3, 66, '8GB', '128GB', 'Super AMOLED,  1080 x 2400 (FHD+),  6.6 inch - Tần', 'Đen', '5000Mah', ' 32 MPpx', '50MP + 12MP + 5MPpx', ' Android 14'),
(4, 67, '8GB', '512GB', ' Dynamic AMOLED 2X  Độ phân giải  2340 x 1080 pixe', 'Tím', '5000Mah', '12 MPpx', '50MP + 12MP + 10MPpx', 'Android 14'),
(5, 68, '12GB', '512GB', 'Dynamic AMOLED 2X  Độ phân giải  3120 x 1440 pixel', 'Đen', '5000Mah', '12 MPpx', ' 200MP + 12MP + 10MP + 50MPpx', ' Android 14'),
(6, 69, '4GB', '128GB', 'IPS LCD  Độ phân giải  1080 x 2408 pixels  Màn hìn', 'Cam', '5000Mah', '8 MPpx', ' Chính 50 MP & Phụ 5 MP, 2 MP, 2 MPpx', 'Android 12'),
(7, 70, '8GB', '256GB', 'AMOLED  Độ phân giải  1080 x 2400 pixel  Màn hình ', 'Tím', '5000Mah', ' 32 MPpx', ' 50MP + 12MP + 5MPpx', 'Android 13'),
(8, 79, '8GB', '256GB', 'OLED6.7\"Super Retina XDR', 'Titan đen', '4422Mah', ' 12 MPpx', ' Chính 48 MP & Phụ 12 MP, 12 MPpx', 'IOS'),
(9, 80, '6GB', '128GB', 'Super Retina XDR OLED, HDR10, Dolby Vision', 'Xanh đen', '4383Mah', '12px', '48px', 'IOS'),
(10, 81, '6GB', '128GB', 'OLED6.7\"Super Retina XDR', 'Đen', '4323Mah', ' 12 MPpx', 'Chính 48 MP & Phụ 12 MP, 12 MPpx', 'IOS'),
(11, 82, '6GB', '128GB', ' OLED, 6.7\", Super Retina XDR', 'Xanh', '4325Mah', '12px', ' 2 camera 12 MPpx', 'IOS'),
(12, 83, '4GB', '64GB', 'OLED, 6.1\", Super Retina XDR', 'Đỏ', '2815Mah', ' 12 px', '2 camera 12 MPpx', 'IOS'),
(13, 84, '4GB', '128GB', ' OLED, 6.1\", Super Retina XDR', 'Xanh', '3240Mah', ' 12 MPpx', ' 2 camera 12 MPpx', 'IOS'),
(14, 91, '1GB', '64GB', '(720 x 1500) px', 'Đen tuyền', '6000Mah', '30px', '30px', ''),
(15, 92, '2GB', '64GB', '(720 x 1200) px', 'Đen xám', '5500Mah', '13px', '13px', ''),
(16, 93, '2GB', '32GB', '(720 x 1700) px', 'Xanh đậm', '6000Mah', '20px', '20px', 'Android'),
(17, 94, '2GB', '128GB', '(720 x 1800) px', 'Trắng', '6000Mah', '30px', '30px', 'Android'),
(42, 165, '4GB', '128GB', 'IPS LCD, 6.8\", Full HD+', 'Xanh Rêu', '4000Mah', '16 MP, f/2.0, (wide), 1/3.06\", 1.0µmpx', '48 MP, f/1.7, 26mm (wide), 1/2.0\", 0.8µm, PDAFpx', 'Android 11'),
(43, 166, '8GB', '128GB', 'IPS LCD, 120Hz, 6.5 inches', 'Đen', '6000Mah', '16 MP, f/2.4, (wide), 1.0µmpx', '50 MP, f/1.8 (wide), 0.61µm, PDAF, OISpx', 'Android 13'),
(101, 101, '2GB', '32GB', '(720 x 1600) px', 'Xanh', ' 5000Mah', '13px', '13px', 'Android '),
(102, 102, '2GB', '32GB', '(720 x 1600) px', 'Xanh ngọc bích', ' 5000Mah', '20px', '20px', 'Android'),
(103, 103, '12GB', '128GB', 'LTPO OLED, 120Hz, HDR10+, 1600 nits (HBM), 2400 ni', 'Đen', '5050Mah', '10.5 MP, f/2.2, 20mm (góc siêu rộng), PDAF Auto-HD', '48 MP, f/2.8, 113mm (tele), dual pixel PDAF, OIS, ', 'Android'),
(104, 104, '8GB', '128GB', 'LTPO AMOLED, 120Hz, HDR10+,1000 nits (HBM), 1500 n', 'Đen', '5000Mah', '10.8 MP, f/2.2 (góc siêu rộng) Auto-HDR, panoramap', '48 MP, f/3.5 (tele),multi-directional PDAF, OIS, 5', 'Android');

-- --------------------------------------------------------

--
-- Table structure for table `cau_hinh_oplung`
--

CREATE TABLE `cau_hinh_oplung` (
  `MA_CHOL` int(11) NOT NULL,
  `MA_SP` int(11) NOT NULL,
  `CHAT_LIEU` varchar(100) NOT NULL,
  `TINH_NANG` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cau_hinh_oplung`
--

INSERT INTO `cau_hinh_oplung` (`MA_CHOL`, `MA_SP`, `CHAT_LIEU`, `TINH_NANG`) VALUES
(16, 75, 'Nhựa PC, lớp phủ silicon', 'Trong suốt'),
(17, 76, 'Nhựa PC', 'Gập dễ dàng'),
(18, 87, 'Silicon', 'Được thiết kế bởi Apple, vỏ silicon với MagSafe là một cách thú vị để bảo vệ iPhone của bạn. Lớp hoà'),
(19, 88, 'Silicon', 'Kết hợp TPU hấp thụ sốc, polycarbonate chống trầy xước rõ ràng và các góc gia cố để mang lại kết quả');

-- --------------------------------------------------------

--
-- Table structure for table `cau_hinh_sac`
--

CREATE TABLE `cau_hinh_sac` (
  `MA_CHS` int(11) NOT NULL,
  `MA_SP` int(11) NOT NULL,
  `KET_NOI` varchar(50) NOT NULL,
  `CONG_SUAT` varchar(100) NOT NULL,
  `TINH_NANG` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cau_hinh_sac`
--

INSERT INTO `cau_hinh_sac` (`MA_CHS`, `MA_SP`, `KET_NOI`, `CONG_SUAT`, `TINH_NANG`) VALUES
(3, 77, 'Type C', '65W', 'có dây'),
(4, 78, 'Type C', '45W', 'Tặng kèm dây sạc'),
(5, 89, 'USB', '5W', 'Với thiết kế siêu nhỏ gọn, bộ đổi nguồn này cung cấp khả năng sạc nhanh, hiệu quả ở nhà, trong văn p'),
(6, 90, 'USB', '27W', 'Thiết kế nhỏ gọn, trực quan của nó giúp sạc khi đang di chuyển dễ dàng. Các nam châm được căn chỉnh '),
(7, 95, 'dây', '30W', 'Chống thấm nước, dây sạc chắc '),
(8, 96, 'dây', '60W', 'Chống thấm nước, dây sạc chắc ');

-- --------------------------------------------------------

--
-- Table structure for table `cau_hinh_tai_nghe`
--

CREATE TABLE `cau_hinh_tai_nghe` (
  `MA_CHTN` int(11) NOT NULL,
  `MA_SP` int(11) NOT NULL,
  `KET_NOI` varchar(50) NOT NULL,
  `TINH_NANG` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cau_hinh_tai_nghe`
--

INSERT INTO `cau_hinh_tai_nghe` (`MA_CHTN`, `MA_SP`, `KET_NOI`, `TINH_NANG`) VALUES
(2, 71, 'Type C', 'Nhỏ gọn'),
(3, 72, 'Không dây', 'Thuận tiện đi lại'),
(4, 85, 'Có dây', 'Không giống như tai nghe nhét tai hình tròn truyền thống, thiết kế của EarPods được xác định bởi hìn'),
(5, 86, 'Không dây', 'AirPods Max tái hiện lại tai nghe over-ear. Trình điều khiển động do Apple thiết kế cung cấp âm than'),
(7, 97, 'bluetooth', 'Không Thấm nước, cách âm hiệu quả, âm thanh chất lượng cao, bass rõ ràng'),
(8, 98, 'bluetooth', 'Không Thấm nước, cách âm hiệu quả, âm thanh chất lượng cao, bass rõ ràng'),
(22, 168, 'có dây', 'Chuẩn chống nước IPX4');

-- --------------------------------------------------------

--
-- Table structure for table `chi_tiet_hoadon`
--

CREATE TABLE `chi_tiet_hoadon` (
  `MA_SP` int(11) NOT NULL,
  `MA_HD` int(11) NOT NULL,
  `SL_BAN` int(11) NOT NULL,
  `THUE_SUAT` int(11) NOT NULL,
  `THANH_TIEN` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chi_tiet_hoadon`
--

INSERT INTO `chi_tiet_hoadon` (`MA_SP`, `MA_HD`, `SL_BAN`, `THUE_SUAT`, `THANH_TIEN`) VALUES
(72, 1, 1, 4168000, 480000),
(75, 2, 1, 23000, 230000),
(75, 3, 2, 1975000, 460000),
(80, 3, 1, 1975000, 19290000),
(82, 1, 1, 4168000, 12450000),
(83, 1, 5, 4168000, 28750000);

-- --------------------------------------------------------

--
-- Table structure for table `chi_tiet_nhap`
--

CREATE TABLE `chi_tiet_nhap` (
  `MA_PN` int(11) NOT NULL,
  `MA_SP` int(11) NOT NULL,
  `DON_GIA` int(11) NOT NULL,
  `SO_LUONG` int(11) NOT NULL,
  `THANH_TIEN` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chuc_nang`
--

CREATE TABLE `chuc_nang` (
  `MA_CN` int(10) NOT NULL,
  `TEN_CN` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chuc_nang`
--

INSERT INTO `chuc_nang` (`MA_CN`, `TEN_CN`) VALUES
(29, 'Thêm Sản Phẩm'),
(30, 'Sửa Sản Phẩm'),
(31, 'Xóa Sản Phẩm'),
(32, 'Thêm Hóa Đơn'),
(33, 'Sửa Hóa Đơn'),
(35, 'Thêm Phiếu Nhập'),
(36, 'Sửa Phiếu Nhập'),
(37, 'Xóa Phiếu Nhập'),
(38, 'Thêm Chức Năng'),
(39, 'Sửa Chức Năng'),
(40, 'Xóa Chức Năng'),
(41, 'Thêm Khách Hàng'),
(42, 'Sửa Khách Hàng'),
(43, 'Xóa Khách Hàng'),
(44, 'Thêm Khuyến Mãi'),
(45, 'Sửa Khuyến Mãi'),
(51, 'Thêm Nhân Viên'),
(52, 'Sửa Nhân Viên'),
(53, 'Xóa Nhân Viên'),
(54, 'Thêm Nhà Sản Xuất'),
(55, 'Xóa Nhà Sản Xuất'),
(56, 'Sửa Nhà Sản Xuất'),
(57, 'Thêm Phiếu Bảo Hành'),
(58, 'Sửa Phiếu Bảo Hành'),
(59, 'Xóa Phiếu Bảo Hành'),
(60, 'Thêm Quyền'),
(61, 'Sửa Quyền'),
(62, 'Xóa Quyền'),
(63, 'Thêm Tài Khoản'),
(64, 'Sửa Tài Khoản'),
(66, 'Thống Kê'),
(67, 'Thêm Serial'),
(68, 'Sửa Serial'),
(69, 'Xóa Serial'),
(70, 'Kích Hoạt Tài Khoản'),
(71, 'Nhập Phiếu Nhập');

-- --------------------------------------------------------

--
-- Table structure for table `ctq_chuc_nang`
--

CREATE TABLE `ctq_chuc_nang` (
  `MA_Q` int(10) NOT NULL,
  `MA_CN` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ctq_chuc_nang`
--

INSERT INTO `ctq_chuc_nang` (`MA_Q`, `MA_CN`) VALUES
(1, 29),
(1, 32),
(1, 33),
(1, 35),
(1, 36),
(1, 37),
(1, 38),
(1, 41),
(1, 44),
(1, 51),
(1, 53),
(1, 54),
(1, 55),
(1, 56),
(1, 57),
(1, 60),
(1, 61),
(1, 62),
(1, 63),
(1, 66),
(1, 67),
(1, 68),
(1, 69),
(1, 70),
(1, 71);

-- --------------------------------------------------------

--
-- Table structure for table `hoa_don`
--

CREATE TABLE `hoa_don` (
  `MA_HD` int(10) NOT NULL,
  `MA_KM` int(11) NOT NULL,
  `NGAY_TAO` date NOT NULL DEFAULT current_timestamp(),
  `TINH_TRANG` varchar(20) NOT NULL,
  `MA_NV` int(10) DEFAULT NULL,
  `MA_KH` int(10) DEFAULT NULL,
  `TONG_TIEN` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hoa_don`
--

INSERT INTO `hoa_don` (`MA_HD`, `MA_KM`, `NGAY_TAO`, `TINH_TRANG`, `MA_NV`, `MA_KH`, `TONG_TIEN`) VALUES
(1, 1, '2024-05-11', 'Đã giao hàng', 2, 26, 45848000),
(2, 1, '2024-05-11', 'Chưa liên lạc', 2, 29, 253000),
(3, 1, '2024-05-11', 'Đã giao hàng', 2, 26, 21725000);

-- --------------------------------------------------------

--
-- Table structure for table `khach_hang`
--

CREATE TABLE `khach_hang` (
  `MA_KH` int(10) NOT NULL,
  `MA_TK` int(11) NOT NULL,
  `HOTEN_KH` varchar(50) NOT NULL,
  `G_TINH` varchar(50) NOT NULL,
  `DIA_CHI` varchar(50) NOT NULL,
  `SO_DT` varchar(10) NOT NULL,
  `SO_CCCD` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `khach_hang`
--

INSERT INTO `khach_hang` (`MA_KH`, `MA_TK`, `HOTEN_KH`, `G_TINH`, `DIA_CHI`, `SO_DT`, `SO_CCCD`) VALUES
(26, 29, 'KH', 'Nam', 'KHDASDGDG', '0903424325', '090321312312'),
(29, 34, 'TJSHNzuc', 'das', 'dasd', '3213123123', '213123123123');

-- --------------------------------------------------------

--
-- Table structure for table `khuyen_mai`
--

CREATE TABLE `khuyen_mai` (
  `MA_KM` int(11) NOT NULL,
  `TEN_KM` varchar(100) NOT NULL,
  `DIEU_KIEN` int(11) NOT NULL,
  `SO_TIEN_GIAM` int(11) NOT NULL,
  `NGAY_BĐ` date NOT NULL,
  `NGAY_KT` date NOT NULL,
  `TINH_TRANG` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `khuyen_mai`
--

INSERT INTO `khuyen_mai` (`MA_KM`, `TEN_KM`, `DIEU_KIEN`, `SO_TIEN_GIAM`, `NGAY_BĐ`, `NGAY_KT`, `TINH_TRANG`) VALUES
(1, 'Không có', 0, 0, '2024-05-01', '2024-05-01', 'Có '),
(10, 'Khuyến mãi', 100000, 10, '2024-05-01', '2025-05-01', 'Có hiệu lực');

-- --------------------------------------------------------

--
-- Table structure for table `loai`
--

CREATE TABLE `loai` (
  `MA_LOAI` int(11) NOT NULL,
  `TEN_LOAI` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loai`
--

INSERT INTO `loai` (`MA_LOAI`, `TEN_LOAI`) VALUES
(1, 'Điện thoại'),
(3, 'Tai nghe'),
(4, 'Ốp lưng'),
(5, 'Sạc');

-- --------------------------------------------------------

--
-- Table structure for table `nhan_vien`
--

CREATE TABLE `nhan_vien` (
  `MA_NV` int(10) NOT NULL,
  `MA_TK` int(11) NOT NULL,
  `HOTEN_NV` varchar(50) NOT NULL,
  `DIA_CHI` varchar(50) NOT NULL,
  `SO_DT` varchar(10) NOT NULL,
  `SO_CCCD` varchar(12) NOT NULL,
  `G_TINH` varchar(5) DEFAULT NULL CHECK (`G_TINH` in ('Nam','Nữ')),
  `N_SINH` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `nhan_vien`
--

INSERT INTO `nhan_vien` (`MA_NV`, `MA_TK`, `HOTEN_NV`, `DIA_CHI`, `SO_DT`, `SO_CCCD`, `G_TINH`, `N_SINH`) VALUES
(2, 28, 'ADMIN', 'ADMIN', '090', '090', 'Nam', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `nha_sx`
--

CREATE TABLE `nha_sx` (
  `MA_NSX` int(11) NOT NULL,
  `TEN_NSX` varchar(50) NOT NULL,
  `DIA_CHI` varchar(50) NOT NULL,
  `SO_DT` varchar(10) NOT NULL,
  `EMAIL` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `nha_sx`
--

INSERT INTO `nha_sx` (`MA_NSX`, `TEN_NSX`, `DIA_CHI`, `SO_DT`, `EMAIL`) VALUES
(1, 'Apple', 'VN, Bùi Thị Xuân', '1234567890', 'appleChina@gmail.com'),
(2, 'Samsung', 'VN, TP.HCM', '114', 'samsungVN@gmail.com'),
(6, 'TCL', 'DASD', '1234567890', 'DASDA@GMAIL.COM'),
(7, 'Google', 'asdsadas', '1161231234', 'DASDA@GMAIL.COM'),
(12, 'Motorola', 'dasd', '1234353412', 'appleChina@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `phieu_bao_hanh`
--

CREATE TABLE `phieu_bao_hanh` (
  `MA_PBH` int(10) NOT NULL,
  `MA_SERIAL` int(11) NOT NULL,
  `MA_KH` int(11) NOT NULL,
  `NGAY_BAT_DAU` date DEFAULT current_timestamp(),
  `NGAY_HET_HAN` date DEFAULT current_timestamp(),
  `THOI_GIAN_BAOHANH` varchar(50) DEFAULT NULL,
  `TINH_TRANG` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `phieu_bao_hanh`
--

INSERT INTO `phieu_bao_hanh` (`MA_PBH`, `MA_SERIAL`, `MA_KH`, `NGAY_BAT_DAU`, `NGAY_HET_HAN`, `THOI_GIAN_BAOHANH`, `TINH_TRANG`) VALUES
(136, 236, 26, '2024-05-11', '2024-05-11', '0', 'Chưa có hiệu lực'),
(137, 237, 26, '2024-05-11', '2024-05-11', '0', 'Chưa có hiệu lực'),
(138, 238, 26, '2024-05-11', '2024-05-11', '0', 'Chưa có hiệu lực'),
(139, 236, 26, '2024-05-11', '2024-05-11', '0', 'Chưa có hiệu lực'),
(140, 237, 26, '2024-05-11', '2024-05-11', '0', 'Chưa có hiệu lực'),
(141, 238, 26, '2024-05-11', '2024-05-11', '0', 'Chưa có hiệu lực'),
(142, 239, 26, '2024-05-11', '2024-05-11', '0', 'Chưa có hiệu lực'),
(143, 240, 26, '2024-05-11', '2024-05-11', '0', 'Chưa có hiệu lực');

-- --------------------------------------------------------

--
-- Table structure for table `phieu_nhap`
--

CREATE TABLE `phieu_nhap` (
  `MA_PN` int(10) NOT NULL,
  `NGAY_NHAP` date NOT NULL,
  `MA_NV` int(10) DEFAULT NULL,
  `MA_NSX` int(10) DEFAULT NULL,
  `TRANG_THAI` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quyen`
--

CREATE TABLE `quyen` (
  `MA_Q` int(10) NOT NULL,
  `TEN_Q` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `quyen`
--

INSERT INTO `quyen` (`MA_Q`, `TEN_Q`) VALUES
(1, 'ADMIN'),
(4, 'Khách Hàng');

-- --------------------------------------------------------

--
-- Table structure for table `san_pham`
--

CREATE TABLE `san_pham` (
  `MA_SP` int(11) NOT NULL,
  `MA_LOAI` int(11) NOT NULL,
  `MA_NSX` int(11) NOT NULL,
  `TEN_SP` varchar(100) NOT NULL,
  `GIA_BAN` int(11) NOT NULL,
  `HINH_ANH` varchar(100) NOT NULL,
  `SO_LUONG` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `san_pham`
--

INSERT INTO `san_pham` (`MA_SP`, `MA_LOAI`, `MA_NSX`, `TEN_SP`, `GIA_BAN`, `HINH_ANH`, `SO_LUONG`) VALUES
(65, 1, 2, 'Samsung Galaxy S23 FE 5G 128GB', 12890000, 'samsung-galaxy-s23-fe-xanh-1.jpg', 11),
(66, 1, 2, 'Samsung Galaxy A55 5G 128GB', 8990000, 'samsung_galaxy_a55_didongviet_xanhden_8.webp', 11),
(67, 1, 2, 'Samsung Galaxy S24 5G 512GB', 22790000, '1706610499073_samsung_s24_tim_didongviet.webp', 21),
(68, 1, 2, 'Samsung Galaxy S24 Ultra 5G', 32490000, '1705513410025_samsung_galaxy_s24_ultra_den_didongviet.webp', 1),
(69, 1, 2, 'Samsung Galaxy A23 5G', 4190000, 'samsung-galaxy-a23-5g-mau-cam-didongviet.webp', 11),
(70, 1, 2, 'Samsung Galaxy A54 5G 256GB', 7890000, '1689348907135_galaxy_a54_didongviet_1.webp', 1),
(71, 3, 2, 'Tai nghe có dây Samsung Type C (EO-IC100)', 390000, 'image-removebg-preview-9.webp', 1),
(72, 3, 2, 'Tai nghe Samsung Itfit', 480000, 'image-removebg-preview (91).webp', 0),
(75, 4, 2, 'Ốp lưng trong Galaxy A35', 230000, 'op-lung-trong-galaxy-a55.webp', -2),
(76, 4, 2, 'Ốp lưng Ốp lưng Aramid Z Flip3', 390000, 'image-removebg-preview-25.webp', 1),
(77, 5, 2, 'Củ sạc Samsung ba cổng 65W T6530', 1150000, 'image-removebg-preview-59.webp', 1),
(78, 5, 2, 'Củ sạc Samsung Type C 45W Kèm cáp C-C 5A 1.8m T4510', 790000, 'vn-45w-power-adapter-ep-t4510-ep-t4510xbegww-530966008-removebg-preview.webp', 1),
(79, 1, 1, 'iPhone 15 Pro Max', 29590000, 'iPhone_15_Pro_Black_Titanium_Double.png', -4),
(80, 1, 1, 'iPhone 15 Plus', 19290000, 'iPhone_15_Black_Double.png', -1),
(81, 1, 1, 'iPhone 14 Pro Max', 27390000, 'iPhone_14_Pro_Max_Space_Black_Pure_Double.png', 1),
(82, 1, 1, 'iPhone 14 Plus', 12450000, 'iPhone_14_Plus_Blue_Pure_Double.png', 0),
(83, 1, 1, 'iPhone 12', 5750000, 'iphone-12_red_back-front.png', -9),
(84, 1, 1, 'iPhone 13', 9650000, 'iphone-13-blue-double.png', 1),
(85, 3, 1, 'Apple EarPods with Lightning Connector', 700000, 'Apple EarPods with Lightning Connector.png', -3),
(86, 3, 1, 'Apple AirPods Max', 16590000, 'Apple AirPods Max.png', 1),
(87, 4, 1, 'Ốp lưng iphone 13 có magsafe', 1500000, 'Apple - iPhone 13 mini Silicone Case with MagSafe.png', 1),
(88, 4, 1, 'Ôp lưng Iphone 15', 1430000, 'blu element.jpg', 1),
(89, 5, 1, 'Củ sạc USB 5W ', 660000, 'Củ sạc apple5W.png', 1),
(90, 5, 1, 'Sạc dự phòng apple', 2250000, 'Sạc dự phòng apple.png', 1),
(91, 1, 6, 'TCL 408', 2000000, 'TCL3.jpg', 10),
(92, 1, 6, 'TCL 30SE', 3000000, 'TCL4.jpg', 10),
(93, 1, 6, 'TCL 30 - PASSAT', 3000000, 'TCL5.jpg', 10),
(94, 1, 6, 'TCL 305 - CRUZE LITE', 1590000, 'TCL6.jpg', 10),
(95, 5, 6, 'Cáp Dây Rút Type C - Type C 1m Baseus Retractable Bright Mirror CB000062', 140000, 'TCL_sac1.jpg', 10),
(96, 5, 6, 'Cáp Đa Năng 4 in 1 Lightning Type C 1m Xmobile DR003', 200000, 'TCL_sac2.jpg', 10),
(97, 3, 6, 'Tai nghe Bluetooth True Wireless Samsung Galaxy Buds FE R400N', 1400000, 'TCL_TN1.jpg', 10),
(98, 3, 6, 'Tai nghe Bluetooth True Wireless AVA+ Go F25', 230000, 'TCL_TN2.jpg', 10),
(101, 1, 6, 'TCL 40 NXTPAPER', 11000000, 'TCL1.jpg', 10),
(102, 1, 6, 'TCL 406s', 12000000, 'TCL2.jpg', 10),
(103, 1, 7, 'Pixel 8 Pro', 18890000, 'Google-Pixel-8-Pro_Obsidian_Front.png', 1),
(104, 1, 7, 'Pixel 7 Pro', 9490000, 'Google-Pixel7-Pro_Obsidian_Front.png', 1),
(165, 1, 12, 'Motorola Moto G Stylus 2021', 3090000, 'gstylus5g-3592.png', 1),
(166, 1, 12, 'Motorola Moto G54 5G 2 Sim XT2343', 4290000, 'moto-g54-5g-db-709x800-1693983219-5459.png', 1),
(168, 3, 12, 'Motorola VerveLoop 200', 399000, '9faf7e50fd4e8ba9a5717fa3cc55a9ce.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `serial`
--

CREATE TABLE `serial` (
  `MA_SERIAL` int(11) NOT NULL,
  `MA_SP` int(11) NOT NULL,
  `SERIAL_NUMBER` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `serial`
--

INSERT INTO `serial` (`MA_SERIAL`, `MA_SP`, `SERIAL_NUMBER`) VALUES
(236, 72, 'CHƯA CÓ SERIAL'),
(237, 82, 'CHƯA CÓ SERIAL'),
(238, 83, 'CHƯA CÓ SERIAL'),
(239, 75, 'CHƯA CÓ SERIAL'),
(240, 80, 'CHƯA CÓ SERIAL');

-- --------------------------------------------------------

--
-- Table structure for table `tai_khoan`
--

CREATE TABLE `tai_khoan` (
  `MA_TK` int(10) NOT NULL,
  `TEN_TK` varchar(50) NOT NULL,
  `MAT_KHAU` varchar(50) NOT NULL,
  `NGAY_TAO_TK` date NOT NULL DEFAULT current_timestamp(),
  `TINH_TRANG` varchar(30) NOT NULL,
  `MA_Q` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tai_khoan`
--

INSERT INTO `tai_khoan` (`MA_TK`, `TEN_TK`, `MAT_KHAU`, `NGAY_TAO_TK`, `TINH_TRANG`, `MA_Q`) VALUES
(28, 'ADMIN', 'ADMIN', '2024-05-10', 'hoạt động', 1),
(29, 'KH', 'KH', '2024-05-10', 'hoạt động', 4),
(34, 'zed1235', '123456Aa@', '2024-05-11', 'hoạt động', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cau_hinh_dien_thoai`
--
ALTER TABLE `cau_hinh_dien_thoai`
  ADD PRIMARY KEY (`MA_CHĐT`),
  ADD KEY `MA_SP` (`MA_SP`);

--
-- Indexes for table `cau_hinh_oplung`
--
ALTER TABLE `cau_hinh_oplung`
  ADD PRIMARY KEY (`MA_CHOL`),
  ADD KEY `MA_SP` (`MA_SP`);

--
-- Indexes for table `cau_hinh_sac`
--
ALTER TABLE `cau_hinh_sac`
  ADD PRIMARY KEY (`MA_CHS`),
  ADD KEY `MA_SP` (`MA_SP`);

--
-- Indexes for table `cau_hinh_tai_nghe`
--
ALTER TABLE `cau_hinh_tai_nghe`
  ADD PRIMARY KEY (`MA_CHTN`),
  ADD KEY `MA_SP` (`MA_SP`);

--
-- Indexes for table `chi_tiet_hoadon`
--
ALTER TABLE `chi_tiet_hoadon`
  ADD PRIMARY KEY (`MA_SP`,`MA_HD`),
  ADD KEY `MA_HD` (`MA_HD`);

--
-- Indexes for table `chi_tiet_nhap`
--
ALTER TABLE `chi_tiet_nhap`
  ADD PRIMARY KEY (`MA_PN`,`MA_SP`),
  ADD KEY `MA_SP` (`MA_SP`);

--
-- Indexes for table `chuc_nang`
--
ALTER TABLE `chuc_nang`
  ADD PRIMARY KEY (`MA_CN`);

--
-- Indexes for table `ctq_chuc_nang`
--
ALTER TABLE `ctq_chuc_nang`
  ADD PRIMARY KEY (`MA_Q`,`MA_CN`),
  ADD KEY `MA_CN` (`MA_CN`);

--
-- Indexes for table `hoa_don`
--
ALTER TABLE `hoa_don`
  ADD PRIMARY KEY (`MA_HD`),
  ADD KEY `MA_NV` (`MA_NV`),
  ADD KEY `MA_KH` (`MA_KH`),
  ADD KEY `MA_KM` (`MA_KM`);

--
-- Indexes for table `khach_hang`
--
ALTER TABLE `khach_hang`
  ADD PRIMARY KEY (`MA_KH`),
  ADD KEY `MA_TK` (`MA_TK`);

--
-- Indexes for table `khuyen_mai`
--
ALTER TABLE `khuyen_mai`
  ADD PRIMARY KEY (`MA_KM`);

--
-- Indexes for table `loai`
--
ALTER TABLE `loai`
  ADD PRIMARY KEY (`MA_LOAI`);

--
-- Indexes for table `nhan_vien`
--
ALTER TABLE `nhan_vien`
  ADD PRIMARY KEY (`MA_NV`),
  ADD KEY `MA_TK` (`MA_TK`);

--
-- Indexes for table `nha_sx`
--
ALTER TABLE `nha_sx`
  ADD PRIMARY KEY (`MA_NSX`);

--
-- Indexes for table `phieu_bao_hanh`
--
ALTER TABLE `phieu_bao_hanh`
  ADD PRIMARY KEY (`MA_PBH`),
  ADD KEY `MA_KH` (`MA_KH`),
  ADD KEY `MA_SERIAL` (`MA_SERIAL`);

--
-- Indexes for table `phieu_nhap`
--
ALTER TABLE `phieu_nhap`
  ADD PRIMARY KEY (`MA_PN`),
  ADD KEY `MA_NV` (`MA_NV`),
  ADD KEY `MA_NPP` (`MA_NSX`);

--
-- Indexes for table `quyen`
--
ALTER TABLE `quyen`
  ADD PRIMARY KEY (`MA_Q`);

--
-- Indexes for table `san_pham`
--
ALTER TABLE `san_pham`
  ADD PRIMARY KEY (`MA_SP`),
  ADD KEY `MA_NSX` (`MA_NSX`),
  ADD KEY `MA_LOAI` (`MA_LOAI`);

--
-- Indexes for table `serial`
--
ALTER TABLE `serial`
  ADD PRIMARY KEY (`MA_SERIAL`),
  ADD KEY `MA_SP` (`MA_SP`);

--
-- Indexes for table `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD PRIMARY KEY (`MA_TK`),
  ADD KEY `MA_Q` (`MA_Q`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cau_hinh_dien_thoai`
--
ALTER TABLE `cau_hinh_dien_thoai`
  MODIFY `MA_CHĐT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `cau_hinh_oplung`
--
ALTER TABLE `cau_hinh_oplung`
  MODIFY `MA_CHOL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `cau_hinh_sac`
--
ALTER TABLE `cau_hinh_sac`
  MODIFY `MA_CHS` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `cau_hinh_tai_nghe`
--
ALTER TABLE `cau_hinh_tai_nghe`
  MODIFY `MA_CHTN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `chuc_nang`
--
ALTER TABLE `chuc_nang`
  MODIFY `MA_CN` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `hoa_don`
--
ALTER TABLE `hoa_don`
  MODIFY `MA_HD` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `khach_hang`
--
ALTER TABLE `khach_hang`
  MODIFY `MA_KH` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `khuyen_mai`
--
ALTER TABLE `khuyen_mai`
  MODIFY `MA_KM` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `loai`
--
ALTER TABLE `loai`
  MODIFY `MA_LOAI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `nhan_vien`
--
ALTER TABLE `nhan_vien`
  MODIFY `MA_NV` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `nha_sx`
--
ALTER TABLE `nha_sx`
  MODIFY `MA_NSX` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `phieu_bao_hanh`
--
ALTER TABLE `phieu_bao_hanh`
  MODIFY `MA_PBH` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;

--
-- AUTO_INCREMENT for table `phieu_nhap`
--
ALTER TABLE `phieu_nhap`
  MODIFY `MA_PN` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `quyen`
--
ALTER TABLE `quyen`
  MODIFY `MA_Q` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `san_pham`
--
ALTER TABLE `san_pham`
  MODIFY `MA_SP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;

--
-- AUTO_INCREMENT for table `serial`
--
ALTER TABLE `serial`
  MODIFY `MA_SERIAL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=241;

--
-- AUTO_INCREMENT for table `tai_khoan`
--
ALTER TABLE `tai_khoan`
  MODIFY `MA_TK` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cau_hinh_dien_thoai`
--
ALTER TABLE `cau_hinh_dien_thoai`
  ADD CONSTRAINT `cau_hinh_dien_thoai_ibfk_1` FOREIGN KEY (`MA_SP`) REFERENCES `san_pham` (`MA_SP`);

--
-- Constraints for table `cau_hinh_oplung`
--
ALTER TABLE `cau_hinh_oplung`
  ADD CONSTRAINT `cau_hinh_oplung_ibfk_1` FOREIGN KEY (`MA_SP`) REFERENCES `san_pham` (`MA_SP`);

--
-- Constraints for table `cau_hinh_sac`
--
ALTER TABLE `cau_hinh_sac`
  ADD CONSTRAINT `cau_hinh_sac_ibfk_1` FOREIGN KEY (`MA_SP`) REFERENCES `san_pham` (`MA_SP`);

--
-- Constraints for table `cau_hinh_tai_nghe`
--
ALTER TABLE `cau_hinh_tai_nghe`
  ADD CONSTRAINT `cau_hinh_tai_nghe_ibfk_1` FOREIGN KEY (`MA_SP`) REFERENCES `san_pham` (`MA_SP`);

--
-- Constraints for table `chi_tiet_hoadon`
--
ALTER TABLE `chi_tiet_hoadon`
  ADD CONSTRAINT `chi_tiet_hoadon_ibfk_1` FOREIGN KEY (`MA_HD`) REFERENCES `hoa_don` (`MA_HD`),
  ADD CONSTRAINT `chi_tiet_hoadon_ibfk_2` FOREIGN KEY (`MA_SP`) REFERENCES `san_pham` (`MA_SP`);

--
-- Constraints for table `chi_tiet_nhap`
--
ALTER TABLE `chi_tiet_nhap`
  ADD CONSTRAINT `chi_tiet_nhap_ibfk_1` FOREIGN KEY (`MA_PN`) REFERENCES `phieu_nhap` (`MA_PN`),
  ADD CONSTRAINT `chi_tiet_nhap_ibfk_2` FOREIGN KEY (`MA_SP`) REFERENCES `san_pham` (`MA_SP`);

--
-- Constraints for table `ctq_chuc_nang`
--
ALTER TABLE `ctq_chuc_nang`
  ADD CONSTRAINT `ctq_chuc_nang_ibfk_1` FOREIGN KEY (`MA_CN`) REFERENCES `chuc_nang` (`MA_CN`),
  ADD CONSTRAINT `ctq_chuc_nang_ibfk_2` FOREIGN KEY (`MA_Q`) REFERENCES `quyen` (`MA_Q`);

--
-- Constraints for table `hoa_don`
--
ALTER TABLE `hoa_don`
  ADD CONSTRAINT `hoa_don_ibfk_1` FOREIGN KEY (`MA_KH`) REFERENCES `khach_hang` (`MA_KH`),
  ADD CONSTRAINT `hoa_don_ibfk_2` FOREIGN KEY (`MA_NV`) REFERENCES `nhan_vien` (`MA_NV`),
  ADD CONSTRAINT `hoa_don_ibfk_3` FOREIGN KEY (`MA_KM`) REFERENCES `khuyen_mai` (`MA_KM`);

--
-- Constraints for table `khach_hang`
--
ALTER TABLE `khach_hang`
  ADD CONSTRAINT `khach_hang_ibfk_1` FOREIGN KEY (`MA_TK`) REFERENCES `tai_khoan` (`MA_TK`);

--
-- Constraints for table `nhan_vien`
--
ALTER TABLE `nhan_vien`
  ADD CONSTRAINT `nhan_vien_ibfk_1` FOREIGN KEY (`MA_TK`) REFERENCES `tai_khoan` (`MA_TK`);

--
-- Constraints for table `phieu_bao_hanh`
--
ALTER TABLE `phieu_bao_hanh`
  ADD CONSTRAINT `phieu_bao_hanh_ibfk_2` FOREIGN KEY (`MA_KH`) REFERENCES `khach_hang` (`MA_KH`),
  ADD CONSTRAINT `phieu_bao_hanh_ibfk_3` FOREIGN KEY (`MA_SERIAL`) REFERENCES `serial` (`MA_SERIAL`);

--
-- Constraints for table `phieu_nhap`
--
ALTER TABLE `phieu_nhap`
  ADD CONSTRAINT `phieu_nhap_ibfk_3` FOREIGN KEY (`MA_NV`) REFERENCES `nhan_vien` (`MA_NV`),
  ADD CONSTRAINT `phieu_nhap_ibfk_4` FOREIGN KEY (`MA_NSX`) REFERENCES `nha_sx` (`MA_NSX`);

--
-- Constraints for table `san_pham`
--
ALTER TABLE `san_pham`
  ADD CONSTRAINT `san_pham_ibfk_1` FOREIGN KEY (`MA_NSX`) REFERENCES `nha_sx` (`MA_NSX`),
  ADD CONSTRAINT `san_pham_ibfk_2` FOREIGN KEY (`MA_LOAI`) REFERENCES `loai` (`MA_LOAI`);

--
-- Constraints for table `serial`
--
ALTER TABLE `serial`
  ADD CONSTRAINT `serial_ibfk_1` FOREIGN KEY (`MA_SP`) REFERENCES `san_pham` (`MA_SP`);

--
-- Constraints for table `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD CONSTRAINT `tai_khoan_ibfk_1` FOREIGN KEY (`MA_Q`) REFERENCES `quyen` (`MA_Q`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
