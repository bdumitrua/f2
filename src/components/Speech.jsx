const Speech = () => {
    const input =
        "block text-xl mt-3 mb-6 w-80 px-5 py-2 rounded-lg border-black border-2 outline-0";
    return (
        <section className="speech mt-8">
            <div className="container">
                <h1 className="text-center text-3xl mb-8">Ввод данных</h1>
                <form action="" className="flex-col items-center gap-10">
                    <label htmlFor="treeId" className="text-xl">
                        Номер
                    </label>
                    <input className={input} id="treeId" type="number" />
                    <label htmlFor="treeHeight" className="text-xl">
                        Высота
                    </label>
                    <input className={input} id="treeHeight" type="number" />
                    <label htmlFor="treeAge" className="text-xl">
                        Возраст
                    </label>
                    <input className={input} id="treeAge" type="number" />
                    <label htmlFor="treeType" className="text-xl">
                        Вид
                    </label>
                    <input className={input} id="treeType" type="text" />
                    {/* <label htmlFor="treeDiameter" className="text-xl">
                        Диаметр
                    </label>
                    <input className={input} id="treeDiameter" type="text" /> */}
                    <label htmlFor="treeState" className="text-xl">
                        Состояние
                    </label>
                    <input className={input} id="treeState" type="text" />
                    <label htmlFor="treeTotal" className="text-xl">
                        Итоговая характеристика/оценка
                    </label>
                    <input className={input} id="treeTotal" type="text" />
                </form>
            </div>
        </section>
    );
};

export default Speech;
