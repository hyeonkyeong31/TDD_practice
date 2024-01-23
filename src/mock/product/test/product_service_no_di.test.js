const ProductService = require("../product_service_no_di");
const ProductClient = require("../product_client");
jest.mock("../product_client");
// 모듈간에 의존성이 있다면 mock을 이용해서 서로 의존적이지 않도록 한 단위만 타겟해서 테스트해 줄 수있다.

describe("ProductService", () => {
    const fetchItems = jest.fn(async () => [
        { item: "Milk", available: true },
        { item: "Banana", available: false },
    ]);
    ProductClient.mockImplementation(() => {
        return {
            fetchItems,
        };
    });
    let productService;

    beforeEach(() => {
        productService = new ProductService();
    });
    it("should filter out only available items", async () => {
        const items = await productService.fetchAvailableItems();
        expect(items.length).toBe(1);
        expect(items).toEqual([{ item: "Milk", available: true }]);
    });

    it("test", async () => {
        const items = await productService.fetchAvailableItems();
        expect(fetchItems).toHaveBeenCalledTimes(1);
    });
});
