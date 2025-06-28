
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaSun,
  FaMoon,
  FaWater,
  FaRegSmile,
  FaRegSadTear,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import axios from "axios";
import "./HealthQuiz.css";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

// API response function
const generateAPIResponse = async (message) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found. Please log in.');
    }

    const response = await axios.post(
      'https://be-cosai.onrender.com/api/chat',
      { message },
      {
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      }
    );

    return response.data.response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

const HealthQuiz = () => {
  // Quiz state management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);

  // Define all the quiz questions
  const questions = [
    {
      id: "skinType",
      question: "1. Da của bạn thuộc loại nào?",
      type: "radio",
      options: [
        { value: "da-dau", label: "Da dầu (bóng nhờn, lỗ chân lông to, dễ nổi mụn)" },
        { value: "da-kho", label: "Da khô (căng, bong tróc, thiếu độ ẩm)" },
        { value: "da-hon-hop", label: "Da hỗn hợp (vùng chữ T dầu, má khô)" },
        { value: "da-thuong", label: "Da thường (cân bằng, ít vấn đề)" },
        { value: "da-nhay-cam", label: "Da nhạy cảm (dễ kích ứng, mẩn đỏ, ngứa)" },
      ],
      icon: <FaRegSmile size={40} className="question-icon" />,
    },
    {
      id: "skinIssues",
      question: "2. Bạn đang gặp các vấn đề da nào? (Chọn nhiều đáp án)",
      type: "checkbox",
      options: [
        { value: "mun-vien", label: "Mụn viêm (mụn đỏ, sưng, đau)" },
        { value: "mun-dau-den", label: "Mụn đầu đen, mụn đầu trắng" },
        { value: "mun-an", label: "Mụn ẩn (dưới da, không sưng)" },
        { value: "tham-nam", label: "Thâm, nám, tàn nhang" },
        { value: "lo-chan-long-to", label: "Lỗ chân lông to" },
        { value: "lao-hoa", label: "Lão hóa (nếp nhăn, da chảy xệ, mất đàn hồi)" },
        { value: "da-khong-deu-mau", label: "Da không đều màu, xỉn màu" },
        { value: "thieu-nuoc", label: "Da thiếu nước, khô ráp, bong tróc" },
        { value: "kich-ung", label: "Kích ứng, mẩn đỏ, ngứa" },
      ],
      icon: <FaRegSadTear size={40} className="question-icon" />,
    },
    {
      id: "skinSensitivity",
      question: "3. Da bạn có dễ bị kích ứng với mỹ phẩm hoặc yếu tố môi trường không?",
      type: "radio",
      options: [
        { value: "rat-de", label: "Rất dễ (thường xuyên đỏ, ngứa khi dùng sản phẩm mới)" },
        { value: "trung-binh", label: "Thỉnh thoảng (chỉ với một số sản phẩm hoặc môi trường)" },
        { value: "khong", label: "Không (da hiếm khi bị kích ứng)" },
      ],
      icon: <FaRegSadTear size={40} className="question-icon" />,
    },
    {
      id: "sunExposure",
      question: "4. Bạn tiếp xúc với ánh nắng mặt trời bao lâu mỗi ngày?",
      type: "radio",
      options: [
        { value: "it-hon-30p", label: "Dưới 30 phút" },
        { value: "30p-2h", label: "30 phút - 2 giờ" },
        { value: "hon-2h", label: "Trên 2 giờ" },
      ],
      icon: <FaSun size={40} className="question-icon" />,
    },
    {
      id: "sunscreenUsage",
      question: "5. Bạn có sử dụng kem chống nắng hàng ngày không?",
      type: "radio",
      options: [
        { value: "co-hang-ngay", label: "Có, sử dụng hàng ngày (kể cả khi ở trong nhà)" },
        { value: "thinh-thoang", label: "Thỉnh thoảng (chỉ khi ra ngoài lâu)" },
        { value: "khong", label: "Không sử dụng" },
      ],
      icon: <FaSun size={40} className="question-icon" />,
    },
    {
      id: "currentSkincareRoutine",
      question: "6. Quy trình chăm sóc da hiện tại của bạn gồm những bước nào? (Chọn nhiều đáp án)",
      type: "checkbox",
      options: [
        { value: "tay-trang", label: "Tẩy trang" },
        { value: "lam-sach", label: "Rửa mặt bằng sữa rửa mặt" },
        { value: "toner", label: "Dùng toner/nước cân bằng" },
        { value: "serum", label: "Sử dụng serum/tinh chất" },
        { value: "kem-duong", label: "Kem dưỡng ẩm" },
        { value: "kem-chong-nang", label: "Kem chống nắng" },
        { value: "mat-na", label: "Đắp mặt nạ (định kỳ)" },
        { value: "khong", label: "Không có quy trình chăm sóc da" },
      ],
      icon: <FaCheckCircle size={40} className="question-icon" />,
    },
    {
      id: "sleepHours",
      question: "7. Bạn ngủ bao nhiêu tiếng mỗi đêm?",
      type: "radio",
      options: [
        { value: "duoi-6h", label: "Dưới 6 tiếng" },
        { value: "6-8h", label: "6 - 8 tiếng" },
        { value: "tren-8h", label: "Trên 8 tiếng" },
      ],
      icon: <FaMoon size={40} className="question-icon" />,
    },
    {
      id: "waterIntake",
      question: "8. Bạn uống bao nhiêu lít nước mỗi ngày?",
      type: "radio",
      options: [
        { value: "duoi-1l", label: "Dưới 1 lít" },
        { value: "1-2l", label: "1 - 2 lít" },
        { value: "tren-2l", label: "Trên 2 lít" },
      ],
      icon: <FaWater size={40} className="question-icon" />,
    },
    {
      id: "diet",
      question: "9. Chế độ ăn uống của bạn như thế nào? (Chọn nhiều đáp án)",
      type: "checkbox",
      options: [
        { value: "nhieu-rau-cu", label: "Giàu rau củ, trái cây" },
        { value: "nhieu-dau-mo", label: "Nhiều đồ ăn cay nóng, dầu mỡ" },
        { value: "nhieu-duong", label: "Nhiều đồ ngọt, thực phẩm chứa đường" },
        { value: "an-chay", label: "Ăn chay" },
        { value: "thieu-chat", label: "Ăn uống không đầy đủ chất dinh dưỡng" },
      ],
      icon: <FaRegSmile size={40} className="question-icon" />,
    },
    {
      id: "stressLevel",
      question: "10. Mức độ căng thẳng của bạn gần đây?",
      type: "radio",
      options: [
        { value: "cao", label: "Cao (thường xuyên căng thẳng, áp lực)" },
        { value: "trung-binh", label: "Trung bình (thỉnh thoảng căng thẳng)" },
        { value: "thap", label: "Thấp (ít hoặc không căng thẳng)" },
      ],
      icon: <FaRegSadTear size={40} className="question-icon" />,
    },
    {
      id: "exercise",
      question: "11. Bạn tập thể dục bao nhiêu lần mỗi tuần?",
      type: "radio",
      options: [
        { value: "khong", label: "Không tập thể dục" },
        { value: "1-3-lan", label: "1-3 lần/tuần" },
        { value: "4-7-lan", label: "4-7 lần/tuần" },
      ],
      icon: <FaRegSmile size={40} className="question-icon" />,
    },
    {
      id: "environment",
      question: "12. Môi trường bạn sống hoặc làm việc ảnh hưởng đến da như thế nào?",
      type: "checkbox",
      options: [
        { value: "bui-ban", label: "Nhiều bụi bẩn, ô nhiễm" },
        { value: "kho-hanh", label: "Khô hanh, điều hòa thường xuyên" },
        { value: "am-uot", label: "Ẩm ướt, độ ẩm cao" },
        { value: "nhiet-do-cao", label: "Nhiệt độ cao, nóng bức" },
        { value: "binh-thuong", label: "Bình thường, không đáng kể" },
      ],
      icon: <FaSun size={40} className="question-icon" />,
    },
    {
      id: "age",
      question: "13. Độ tuổi của bạn là?",
      type: "number",
      placeholder: "Nhập độ tuổi của bạn (ví dụ: 25)...",
      icon: <FaUser size={40} className="question-icon" />,
    },
    {
      id: "gender",
      question: "14. Giới tính của bạn?",
      type: "radio",
      options: [
        { value: "nam", label: "Nam" },
        { value: "nu", label: "Nữ" },
        { value: "khac", label: "Khác" },
      ],
      icon: <FaUser size={40} className="question-icon" />,
    },
    {
      id: "preferredBrands",
      question: "15. Bạn có thích dùng sản phẩm từ thương hiệu nào không? (Ví dụ: Cocoon, SkinCeuticals)",
      type: "text",
      placeholder: "Nhập tên thương hiệu (nếu có)...",
      icon: <FaCheckCircle size={40} className="question-icon" />,
    },
    {
      id: "budget",
      question: "16. Ngân sách của bạn cho sản phẩm chăm sóc da mỗi tháng là bao nhiêu?",
      type: "radio",
      options: [
        { value: "duoi-500k", label: "Dưới 500.000 VNĐ" },
        { value: "500k-1tr", label: "500.000 - 1.000.000 VNĐ" },
        { value: "tren-1tr", label: "Trên 1.000.000 VNĐ" },
      ],
      icon: <FaCheckCircle size={40} className="question-icon" />,
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const currentAnswers = answers[name] || [];
      if (checked) {
        setAnswers({ ...answers, [name]: [...currentAnswers, value] });
      } else {
        setAnswers({
          ...answers,
          [name]: currentAnswers.filter((item) => item !== value),
        });
      }
    } else {
      setAnswers({ ...answers, [name]: value });
    }
  };

  const handleNextQuestion = () => {
    if (
      !answers[currentQuestion.id] ||
      (Array.isArray(answers[currentQuestion.id]) &&
        answers[currentQuestion.id].length === 0)
    ) {
      alert("Vui lòng trả lời câu hỏi trước khi tiếp tục!");
      return;
    }
    if (currentQuestion.id === "age" && (!answers.age || answers.age <= 0)) {
      alert("Vui lòng nhập độ tuổi hợp lệ!");
      return;
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setRecommendation(null);

    const prompt = `
      Dựa vào thông tin sau đây về tình trạng da và lối sống của một người dùng, hãy tư vấn một lộ trình chăm sóc da chi tiết và gợi ý các sản phẩm phù hợp.

      **Thông tin người dùng**:
      ${Object.entries(answers)
        .map(
          ([key, value]) =>
            `  - ${
              questions.find((q) => q.id === key)?.question.split(". ")[1]
            }: ${Array.isArray(value) ? value.join(", ") : value}`
        )
        .join("\n")}

      **Yêu cầu**:
      1. **Phân tích tình trạng da**:
         - Xác định loại da chính và các vấn đề da cụ thể dựa trên câu trả lời.
         - Đánh giá tác động của lối sống (ngủ, nước, căng thẳng, tập thể dục, môi trường) đến da.
      2. **Lộ trình chăm sóc da hàng ngày**:
         - **Buổi sáng**: Gợi ý các bước chi tiết (ví dụ: Làm sạch, Toner, Serum, Kem dưỡng, Kem chống nắng).
         - **Buổi tối**: Gợi ý các bước chi tiết (ví dụ: Tẩy trang, Làm sạch, Treatment, Kem dưỡng).
         - Xem xét quy trình hiện tại của người dùng để tránh trùng lặp hoặc bổ sung các bước cần thiết.
      3. **Sản phẩm gợi ý**:
         - Đưa ra danh sách sản phẩm cụ thể cho từng bước trong routine, phù hợp với loại da, vấn đề da, và ngân sách.
         - Ưu tiên các thương hiệu Việt Nam như **Cocoon** nếu phù hợp, hoặc các thương hiệu người dùng yêu thích (${answers.preferredBrands || "không có"}).
         - Mỗi sản phẩm bao gồm: **Tên sản phẩm**, **Thương hiệu**, **Mô tả công dụng**, và **Mức giá tham khảo** (nếu có).
      4. **Lời khuyên bổ sung**:
         - Gợi ý về chế độ ăn uống, thói quen sinh hoạt, và cách bảo vệ da khỏi môi trường (ví dụ: ô nhiễm, UV).
         - Lưu ý về các thành phần nên tránh nếu da nhạy cảm hoặc dễ kích ứng.
      5. **Định dạng**:
         - Sử dụng Markdown với tiêu đề (**##**), danh sách gạch đầu dòng (-), và in đậm (**text**) để dễ đọc.
         - Bắt đầu với lời chào thân thiện và kết thúc bằng lời chúc tích cực.

      **Lưu ý**: Đảm bảo các gợi ý phù hợp với ngân sách (${answers.budget || "không xác định"}) và các vấn đề da cụ thể.
    `;

    try {
      const response = await generateAPIResponse(prompt);
      setRecommendation(response);
    } catch (err) {
      console.error("Error calling API:", err);
      setError("Rất tiếc, đã có lỗi xảy ra khi tạo lộ trình tư vấn. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setRecommendation(null);
    setError(null);
  };

  // Animation variants for smooth transitions
  const questionVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.8 },
    visible: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -50, scale: 0.8 },
  };

  return (
    <>
      <Header />
      <div className="health-quiz-container">
        <h1 className="quiz-main-title">
          Tư Vấn Lộ Trình Chăm Sóc Sức Khỏe & Sắc Đẹp
        </h1>
        <p className="quiz-subtitle">
          Trả lời các câu hỏi sau để nhận lộ trình và gợi ý sản phẩm cá nhân hóa.
        </p>
        <div className="quiz-content-box">
          <AnimatePresence mode="wait">
            {recommendation ? (
              <motion.div
                key="recommendation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="recommendation-result"
              >
                <h2 className="result-title">Lộ Trình Tư Vấn Dành Cho Bạn</h2>
                <div
                  className="markdown-content"
                  dangerouslySetInnerHTML={{
                    __html: recommendation.replace(/\n/g, "<br />"),
                  }}
                />
                <button className="reset-button" onClick={handleReset}>
                  Bắt đầu lại
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={currentQuestion.id}
                variants={questionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="question-card"
              >
                {currentQuestion.icon}
                <h2 className="question-text">
                  {currentQuestion.question} ({currentQuestionIndex + 1}/{questions.length})
                </h2>
                <div className="answer-options">
                  {currentQuestion.type === "radio" &&
                    currentQuestion.options.map((option) => (
                      <label key={option.value} className="radio-option">
                        <input
                          type="radio"
                          name={currentQuestion.id}
                          value={option.value}
                          checked={answers[currentQuestion.id] === option.value}
                          onChange={handleAnswerChange}
                        />
                        <span className="option-label">{option.label}</span>
                      </label>
                    ))}
                  {currentQuestion.type === "checkbox" &&
                    currentQuestion.options.map((option) => (
                      <label key={option.value} className="checkbox-option">
                        <input
                          type="checkbox"
                          name={currentQuestion.id}
                          value={option.value}
                          checked={(answers[currentQuestion.id] || []).includes(
                            option.value
                          )}
                          onChange={handleAnswerChange}
                        />
                        <span className="option-label">{option.label}</span>
                      </label>
                    ))}
                  {(currentQuestion.type === "text" ||
                    currentQuestion.type === "number") && (
                    <input
                      type={currentQuestion.type}
                      name={currentQuestion.id}
                      placeholder={currentQuestion.placeholder}
                      value={answers[currentQuestion.id] || ""}
                      onChange={handleAnswerChange}
                      className="text-input"
                    />
                  )}
                </div>
                <div className="navigation-buttons">
                  {currentQuestionIndex > 0 && (
                    <button
                      className="prev-button"
                      onClick={handlePrevQuestion}
                      disabled={loading}
                    >
                      ← Quay lại
                    </button>
                  )}
                  {currentQuestionIndex < questions.length - 1 ? (
                    <button
                      className="next-button"
                      onClick={handleNextQuestion}
                      disabled={loading}
                    >
                      Tiếp tục →
                    </button>
                  ) : (
                    <button
                      className="submit-button"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? (
                        <FaSpinner className="spinner" />
                      ) : (
                        "Nhận tư vấn"
                      )}
                    </button>
                  )}
                </div>
                {loading && (
                  <p className="loading-text">
                    Đang phân tích và tạo lộ trình...
                  </p>
                )}
                {error && <p className="error-text">{error}</p>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HealthQuiz;
