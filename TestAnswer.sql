select SaleName, sum(Total) as Total
	from Sale
	join SaleOrder on Sale.SaleID = SaleOrder.SaleID
	join (select OrderID, ProductID, (Qty*Price) as Total
		from SaleOrderDetail) as saleOrderDetail on SaleOrder.OrderID = saleOrderDetail.OrderID
	join Product on saleOrderDetail.ProductID = Product.ProductID
	group by Sale.SaleID, Sale.SaleName
	order by SaleName


select ProductName, sum(Total) as Total
	from SaleOrder
	join (select OrderID, ProductID, (Qty*Price) as Total
		from SaleOrderDetail) as saleOrderDetail
	on SaleOrder.OrderID = saleOrderDetail.OrderID
	join Product on saleOrderDetail.ProductID = Product.ProductID
	where SaleOrder.OrderDate between '2020-01-01' and '2020-06-30'
	group by Product.ProductID, Product.ProductName
	order by Total desc

select CustomerName, CustomerCode, sum(Total) as Total
	from Customer
	join SaleOrder on Customer.CustomerID = SaleOrder.CustomerID
	join (select OrderID, ProductID, (Qty*Price) as Total
		from SaleOrderDetail) as saleOrderDetail on SaleOrder.OrderID = saleOrderDetail.OrderID
	join Product on saleOrderDetail.ProductID = Product.ProductID
	where Customer.CustomerType = 'VIP'
	group by Customer.CustomerID, Customer.CustomerCode, Customer.CustomerName
	order by CustomerName

insert into Customer
values ('C05', 'C005', 'New', 'General')