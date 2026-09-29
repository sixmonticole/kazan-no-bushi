import { DateTime } from "luxon";
import { EVENT_START_ISO, EVENT_TIMEZONE } from "~/utils/site";

type CountdownValues = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

/** Décompose la durée restante en jours, heures, minutes et secondes. */
function remainingParts(target: DateTime): CountdownValues {
    const now = DateTime.now().setZone(EVENT_TIMEZONE);
    const remaining = target.diff(now, ["days", "hours", "minutes", "seconds"]);

    return {
        days: Math.max(0, Math.floor(remaining.days)),
        hours: Math.max(0, Math.floor(remaining.hours)),
        minutes: Math.max(0, Math.floor(remaining.minutes)),
        seconds: Math.max(0, Math.floor(remaining.seconds)),
    };
}

/**
 * Compte à rebours jusqu'au début de l'événement, exprimé dans le fuseau
 * de l'événement (Europe/Paris) et non dans celui du visiteur.
 */
export function useCountdown() {
    const target = DateTime.fromISO(EVENT_START_ISO, { zone: EVENT_TIMEZONE });

    const days = ref(0);
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);
    const isOver = ref(false);

    let interval: ReturnType<typeof setInterval> | undefined;

    function stop(): void {
        if (interval !== undefined) {
            clearInterval(interval);
            interval = undefined;
        }
    }

    function update(): void {
        const now = DateTime.now().setZone(EVENT_TIMEZONE);

        if (now >= target) {
            days.value = 0;
            hours.value = 0;
            minutes.value = 0;
            seconds.value = 0;
            isOver.value = true;
            stop();
            return;
        }

        const parts = remainingParts(target);
        days.value = parts.days;
        hours.value = parts.hours;
        minutes.value = parts.minutes;
        seconds.value = parts.seconds;
    }

    // Calcule une première fois hors du cycle de montage pour que le HTML
    // prérendu affiche déjà les bonnes valeurs avant l'hydratation.
    update();

    onMounted(() => {
        interval = setInterval(update, 1000);
    });

    onBeforeUnmount(stop);

    return { days, hours, minutes, seconds, isOver, target };
}
