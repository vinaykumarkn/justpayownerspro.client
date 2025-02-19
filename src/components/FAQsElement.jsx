import moment from 'moment';


const FAQs = function ({ data }) {
    console.log("FAQ")
    console.log(data)
    const groupedData = data.reduce((acc, obj) => {
        const key = obj.categoryTitle;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
    console.log(groupedData);
    return (
        <>
            
                <div className="card-body">
                    <div className="space-y-4">
                        {Object.keys(groupedData).length > 0 ? (
                            Object.keys(groupedData).map((categoryTitle, index) => (
                                <div className="space-y-1" key={index}>
                                    <h4 className="mb-3 mt-3">{index + 1}. {categoryTitle}</h4>
                                    <div id={`faq-${index + 1}`} className="accordion" role="tablist" aria-multiselectable="true">
                                        {groupedData[categoryTitle].map((faq, faqIndex) => (
                                            <div className="accordion-item" key={faqIndex}>
                                                <div className="accordion-header" role="tab">
                                                    <button className="accordion-button" data-bs-toggle="collapse" data-bs-target={`#faq-${index + 1}-${faqIndex + 1}`}>{faq.question}</button>
                                                </div>
                                                <div id={`faq-${index + 1}-${faqIndex + 1}`} className={faqIndex === 0 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} role="tabpanel" data-bs-parent={`#faq-${index + 1}`}>
                                                    <div className="accordion-body pt-0">
                                                        <div>
                                                            <p>{faq.answer}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center">No FAQs found</div>
                        )}
                    </div>
                </div>
            


        </>
    );


};

export default FAQs;
