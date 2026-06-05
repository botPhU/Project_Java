const workflow = [
  "Frontend gui request tim kiem hoac xem dashboard.",
  "Backend xu ly nghiep vu va truy van co so du lieu.",
  "Job dong bo dinh ky nap metadata tu OpenAlex, Crossref, Semantic Scholar.",
  "Bang trend tong hop duoc cap nhat de phuc vu bieu do nhanh hon.",
  "Frontend hien thi ket qua cho nguoi dung duoi dang danh sach, chart va thong bao."
];

export function WorkflowSection() {
  return (
    <section className="section" id="quy-trinh">
      <div className="section-heading">
        <p className="eyebrow">Quy trinh xu ly</p>
        <h2>Luong nghiep vu tong quat cua he thong</h2>
      </div>
      <div className="workflow">
        {workflow.map((step, index) => (
          <div className="workflow-item" key={step}>
            <span className="workflow-number">{index + 1}</span>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
