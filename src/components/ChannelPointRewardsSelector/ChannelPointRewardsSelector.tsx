"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { getTwitchCustomRewards } from "@/service/Twitch.service";
import { useAppSelector } from "@/stores/hooks";

export function ChannelPointRewardsSelector({
    initialValue="",
    onSelect=()=>{},
}:{
    initialValue?: string
    onSelect?: (value: string) => void
}) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState(initialValue);
	const [options, setOptions] = React.useState<
		{
			label: string;
			value: string;
			cost: number;
		}[]
	>([]);

	const account = useAppSelector((state) => state.account);

	React.useEffect(() => {
		if (!account.accessToken || !account.twitchId) return;

		getTwitchCustomRewards(account.twitchId, account.accessToken).then(
			(response) => {
				const customRewards = response.data.data;
				setOptions(
					customRewards
						.map((reward) => ({
							label: reward.title,
							value: reward.id,
							cost: reward.cost,
						}))
						.sort((a, b) => a.cost - b.cost)
				);
			}
		);
	}, [account]);

    React.useEffect(() => {
        onSelect(value)
    }, [value, onSelect])

    React.useEffect(() => {
        console.log("initialValue", initialValue)
        if (initialValue) {
            setValue(initialValue)
        }
        console.log("options", options)
        console.log(value
            ? options.find((option) => {
                console.log(option.value, value)
                return option.value === value
            })
                    ?.label
            : "Select option...")
    }, [initialValue, options, value])

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[500px] justify-between"
				>
					{value
						? options.find((option) => option.value === value)
								?.label
						: "Select option..."}
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[500px] p-0">
				<Command>
					<CommandInput
						placeholder="Search option..."
						className="h-9"
					/>
					<CommandList>
						<CommandEmpty>No option found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.value}
									onSelect={(currentValue) => {
										setValue(
											currentValue === value
												? ""
												: currentValue
										);
										setOpen(false);
									}}
								>
									<div className="flex justify-between w-[100%] items-center">
										<div className="flex gap-[4px] items-center text-warning">
											{option.label}
											{/* <span className="text-alert">
												<TriangleAlert size={14} />
											</span> */}
										</div>
										<div className="text-xs">
											{option.cost} Points
										</div>
									</div>
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4",
											value === option.value
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
